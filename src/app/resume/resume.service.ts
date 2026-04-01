import { createProvider } from "@/config";
import { DocumentService, PdfService } from "@/global/services";
import { Genkit } from "genkit";
import { nanoid } from "nanoid";
import { BadRequestError, ForbiddenError } from "routing-controllers";
import { Service } from "typedi";
import {
  ResumeInput,
  resumeInputSchema,
  ResumeOutput,
  resumeOutputSchema,
  resumePrompt,
} from "./input";
import { KeyService } from "../keys/key.service";
import { getTemplate } from "./template";

@Service()
export class ResumeService {
  constructor(
    private readonly documentService: DocumentService,
    private readonly pdfService: PdfService,
    private readonly keyService: KeyService,
  ) {}

  public extractText = async (file: Express.Multer.File) => {
    try {
      if (!file) throw new ForbiddenError("PDF/DOCX is required");
      const text = await this.documentService.extractText(
        file.buffer,
        file.mimetype,
      );
      return text;
    } catch (error) {
      throw error;
    }
  };

  public rewriteResume = async (payload: ResumeInput): Promise<string> => {
    try {
      let result: ResumeOutput | null = null;
      let lastError: any = null;

      const referenceTemplate = getTemplate(payload.referenceTemplate);
      const providers = this.provideSwitch({
        ...payload,
        referenceTemplate,
      });

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
        throw new BadRequestError(
          lastError instanceof Error
            ? lastError.message
            : lastError || "Failed to generate response",
        );
      }

      return result.response;
    } catch (error) {
      console.log(`Error in CV Rewrite:`, error);
      throw error;
    }
  };

  public downloadResume = async (payload: { html: string }) => {
    try {
      const fullHtml = `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>Resume</title>
          </head>
          <body>
            ${payload.html || "<div>No Resume Generated</div>"}
          </body>
        </html>
      `;
      return this.pdfService.generatePDF(fullHtml);
    } catch (error) {
      throw error;
    }
  };

  private provider = {
    openai: async (input: Omit<ResumeInput, "provider">) => {
      const { openai } = await this.keyService.getKeys(input.userId);
      if (!openai) throw new BadRequestError("OpenAI API key is required");
      const provider = createProvider(openai, "openai");
      const prompt = provider.definePrompt(resumePrompt);
      return this.executeFlow(input, provider, prompt, "resume-with-openai");
    },
    gemini: async (input: Omit<ResumeInput, "provider">) => {
      const { gemini } = await this.keyService.getKeys(input.userId);
      if (!gemini) throw new BadRequestError("Gemini API key is required");
      const provider = createProvider(gemini, "gemini");
      const prompt = provider.definePrompt(resumePrompt);
      return this.executeFlow(input, provider, prompt, "resume-with-gemini");
    },
  };

  private executeFlow(
    input: ResumeInput,
    provider: Genkit,
    promptFn: (input: ResumeInput) => Promise<{ output: ResumeOutput }>,
    flowName: string,
  ) {
    const flow = provider.defineFlow(
      {
        name: `${flowName}-${nanoid()}`,
        inputSchema: resumeInputSchema,
        outputSchema: resumeOutputSchema,
      },
      async (flowInput: ResumeInput) => {
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

  private provideSwitch(payload: ResumeInput) {
    const { provider, ...rest } = payload;
    const providers = [
      { name: "OpenAI", id: "openai", fn: () => this.provider.openai(rest) },
      { name: "Gemini", id: "gemini", fn: () => this.provider.gemini(rest) },
    ];

    const selectedIndex = providers.findIndex((p) => p.id === provider);

    if (selectedIndex !== -1) {
      const [selected] = providers.splice(selectedIndex, 1);
      return [selected, ...providers];
    }

    return providers.sort(() => Math.random() - 0.5);
  }
}
