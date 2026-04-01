import { AppDataSource, createProvider } from "@/config";
import { OpenAIService, userRoom, WebSocketService } from "@/global/services";
import { Genkit } from "genkit";
import { nanoid } from "nanoid";
import { BadRequestError } from "routing-controllers";
import { Service } from "typedi";
import { Repository } from "typeorm";
import { KeyService } from "../keys/key.service";
import { InterviewSession, InterviewTurn } from "./entities";
import {
  assistanceInput,
  assistanceInputSchema,
  assistanceOutput,
  assistanceOutputSchema,
  assistancePrompt,
  interviewPrompt,
} from "./input";

@Service()
export class InterviewService {
  private readonly sessionRepository: Repository<InterviewSession>;

  constructor(
    private readonly openAIService: OpenAIService,
    private readonly wsService: WebSocketService,
    private readonly keyService: KeyService,
  ) {
    this.sessionRepository = AppDataSource.getRepository(InterviewSession);
  }

  // ─── DB-backed session helpers ────────────────────────────────────────────
  private async getOrCreateSession(userId: string): Promise<InterviewSession> {
    let session = await this.sessionRepository.findOne({ where: { userId } });
    if (!session) {
      session = this.sessionRepository.create({ userId, turns: "[]" });
      await this.sessionRepository.save(session);
    }
    return session;
  }

  private async appendTurns(
    session: InterviewSession,
    newTurns: InterviewTurn[],
  ): Promise<void> {
    const existing = session.getTurns();
    session.setTurns([...existing, ...newTurns]);
    await this.sessionRepository.save(session);
  }

  /**
   * Builds a flat, single-block string for the {{history}} prompt placeholder.
   * Avoids Handlebars conditionals in the template (unsupported by Genkit dotprompt).
   */
  private buildHistoryContext(session: InterviewSession): string {
    const raw = session.toHistoryString();
    if (!raw.trim()) {
      return [
        "[No conversation history yet — this is the FIRST turn of the interview.",
        "Greet the candidate warmly, introduce yourself as the interviewer,",
        "and ask the first relevant question. Do NOT provide a RATING or FEEDBACK.]",
      ].join(" ");
    }
    return [
      "[The following is the full prior exchange. Use it to track what has been discussed,",
      "NEVER repeat a question already asked, and evaluate the candidate's latest response",
      "in context.]",
      "",
      "--- BEGIN HISTORY ---",
      raw.trimEnd(),
      "--- END HISTORY ---",
    ].join("\n");
  }

  public async clearHistory(userId: string): Promise<void> {
    await this.sessionRepository.delete({ userId });
  }

  // ─── Assistance (interview coaching) ──────────────────────────────────────
  public async assistance(payload: assistanceInput): Promise<string> {
    try {
      let result: assistanceOutput | null = null;
      let lastError: any = null;

      const originalTranscript = payload.transcript;
      payload.transcript = originalTranscript;

      const providers = this.provideSwitch(payload);

      for (const provider of providers) {
        try {
          console.log(`Running flow with ${provider.name}`);
          result = await provider.fn();
          if (result && result.response) {
            console.log(`Flow completed with ${provider.name}`);
            break;
          }
        } catch (error) {
          console.log(`Error in ${provider.name}:`, error);
          lastError = error;
        }
      }
      if (!result || !result.response) {
        throw new BadRequestError(lastError || "Failed to generate response");
      }

      return result.response;
    } catch (error) {
      console.log(`Error in assistance:`, error);
      throw error;
    }
  }

  // ─── Interview (mock interview with continuity) ────────────────────────────
  public async interview(payload: assistanceInput): Promise<string> {
    try {
      let result: assistanceOutput | null = null;
      let lastError: any = null;

      const originalTranscript = payload.transcript || "Conversation started.";

      // Load full conversation history from DB and inject flat context string
      const session = await this.getOrCreateSession(payload.userId);
      payload.history = this.buildHistoryContext(session);
      payload.transcript = originalTranscript;

      const providers = this.provideSwitch(payload, true);
      for (const provider of providers) {
        try {
          result = await provider.fn();
          if (result && result.response) {
            // Persist both turns (candidate + interviewer) atomically
            this.appendTurns(session, [
              {
                speaker: "Candidate",
                text: originalTranscript,
                timestamp: Date.now(),
              },
              {
                speaker: "Interviewer",
                text: result.response,
                timestamp: Date.now(),
              },
            ]);

            return result.response;
          }
        } catch (error) {
          lastError = error;
        }
      }

      throw new BadRequestError(lastError || "Failed to generate response");
    } catch (error) {
      throw error;
    }
  }

  // ─── Audio transcript → assistance ────────────────────────────────────────
  public async transcript(
    payload: assistanceInput,
    file: Express.Multer.File,
  ): Promise<void> {
    const sessionId = payload.userId ?? nanoid();
    payload.userId = sessionId;
    const room = userRoom(sessionId);
    const eventName = `assistance-progress`;

    try {
      if (!file) throw new BadRequestError("No audio file provided");

      // 1. Give initial feedback
      this.wsService.emitToRoom(room, eventName, {
        status: "transcribing",
        sender: "ai",
        text: "Converting audio to text...",
        message: "Converting audio to text...",
      });

      // 2. Transcribe using OpenAIService
      const { openai } = await this.keyService.getKeys(payload.userId);
      if (!openai) throw new BadRequestError("OpenAI API key is required");
      const text = await this.openAIService.transcribeAudio(
        file.buffer,
        openai,
      );

      this.wsService.emitToRoom(room, eventName, {
        status: "transcribed",
        sender: "user",
        text,
        message: "Audio transcribed successfully.",
      });

      // 3. Update payload transcript field
      payload.transcript = text;

      // 4. Generate assistance response using existing flow
      this.wsService.emitToRoom(room, eventName, {
        status: "generating_response",
        sender: "ai",
        text: "Generating AI response...",
        message: "Generating AI response...",
      });
      const response = await this.assistance(payload);

      // 5. Send final response
      this.wsService.emitToRoom(room, eventName, {
        status: "completed",
        sender: "ai",
        text: response,
        message: "assistance completed successfully.",
      });
    } catch (error: any) {
      this.wsService.emitToRoom(room, eventName, {
        status: "error",
        sender: "ai",
        text: error.message || "An error occurred",
        message: error.message || "An error occurred",
      });
      throw error;
    }
  }

  // ─── Provider / flow helpers ───────────────────────────────────────────────
  private provider = {
    openai: async (
      input: Omit<assistanceInput, "provider">,
      isInterview = false,
    ) => {
      const { openai } = await this.keyService.getKeys(input.userId);
      if (!openai) throw new BadRequestError("OpenAI API key is required");
      const provider = createProvider(openai, "openai");
      const prompt = provider.definePrompt(
        isInterview ? interviewPrompt : assistancePrompt,
      );
      return this.executeFlow(
        input as assistanceInput,
        provider,
        prompt,
        isInterview ? "interview-with-openai" : "assistance-with-openai",
      );
    },
    gemini: async (
      input: Omit<assistanceInput, "provider">,
      isInterview = false,
    ) => {
      const { gemini } = await this.keyService.getKeys(input.userId);
      if (!gemini) throw new BadRequestError("Gemini API key is required");
      const provider = createProvider(gemini, "gemini");
      const prompt = provider.definePrompt(
        isInterview ? interviewPrompt : assistancePrompt,
      );
      return this.executeFlow(
        input as assistanceInput,
        provider,
        prompt,
        isInterview ? "interview-with-gemini" : "assistance-with-gemini",
      );
    },
  };

  private executeFlow(
    input: assistanceInput,
    provider: Genkit,
    promptFn: (input: assistanceInput) => Promise<{ output: assistanceOutput }>,
    flowName: string,
  ) {
    const flow = provider.defineFlow(
      {
        name: `${flowName}-${nanoid()}`,
        inputSchema: assistanceInputSchema,
        outputSchema: assistanceOutputSchema,
      },
      async (flowInput: assistanceInput) => {
        try {
          const { output } = await promptFn(flowInput);
          return { response: output?.response || "" };
        } catch (error) {
          console.log(`Error in ${flowName}:`, error);
          throw error;
        }
      },
    );

    return flow(input);
  }

  private provideSwitch(payload: assistanceInput, isInterview = false) {
    const { provider, ...rest } = payload;
    const providers = [
      {
        name: "OpenAI",
        id: "openai",
        fn: () => this.provider.openai(rest, isInterview),
      },
      {
        name: "Gemini",
        id: "gemini",
        fn: () => this.provider.gemini(rest, isInterview),
      },
    ];

    const selectedIndex = providers.findIndex((p) => p.id === provider);

    if (selectedIndex !== -1) {
      const [selected] = providers.splice(selectedIndex, 1);
      return [selected, ...providers];
    }

    return providers.sort(() => Math.random() - 0.5);
  }
}
