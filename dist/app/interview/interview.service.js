"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterviewService = void 0;
const config_1 = require("../../config");
const services_1 = require("../../global/services");
const nanoid_1 = require("nanoid");
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const key_service_1 = require("../keys/key.service");
const entities_1 = require("./entities");
const input_1 = require("./input");
let InterviewService = class InterviewService {
    constructor(openAIService, wsService, keyService) {
        this.openAIService = openAIService;
        this.wsService = wsService;
        this.keyService = keyService;
        this.provider = {
            openai: async (input, isInterview = false) => {
                const { openai } = await this.keyService.getKeys(input.userId);
                if (!openai)
                    throw new routing_controllers_1.BadRequestError("OpenAI API key is required");
                const provider = (0, config_1.createProvider)(openai, "openai");
                const prompt = provider.definePrompt(isInterview ? input_1.interviewPrompt : input_1.assistancePrompt);
                return this.executeFlow(input, provider, prompt, isInterview ? "interview-with-openai" : "assistance-with-openai");
            },
            gemini: async (input, isInterview = false) => {
                const { gemini } = await this.keyService.getKeys(input.userId);
                if (!gemini)
                    throw new routing_controllers_1.BadRequestError("Gemini API key is required");
                const provider = (0, config_1.createProvider)(gemini, "gemini");
                const prompt = provider.definePrompt(isInterview ? input_1.interviewPrompt : input_1.assistancePrompt);
                return this.executeFlow(input, provider, prompt, isInterview ? "interview-with-gemini" : "assistance-with-gemini");
            },
        };
        this.sessionRepository = config_1.AppDataSource.getRepository(entities_1.InterviewSession);
    }
    async getOrCreateSession(userId) {
        let session = await this.sessionRepository.findOne({ where: { userId } });
        if (!session) {
            session = this.sessionRepository.create({ userId, turns: "[]" });
            await this.sessionRepository.save(session);
        }
        return session;
    }
    async appendTurns(session, newTurns) {
        const existing = session.getTurns();
        session.setTurns([...existing, ...newTurns]);
        await this.sessionRepository.save(session);
    }
    buildHistoryContext(session) {
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
    async clearHistory(userId) {
        await this.sessionRepository.delete({ userId });
    }
    async assistance(payload) {
        try {
            let result = null;
            let lastError = null;
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
                }
                catch (error) {
                    console.log(`Error in ${provider.name}:`, error);
                    lastError = error;
                }
            }
            if (!result || !result.response) {
                throw new routing_controllers_1.BadRequestError(lastError || "Failed to generate response");
            }
            return result.response;
        }
        catch (error) {
            console.log(`Error in assistance:`, error);
            throw error;
        }
    }
    async interview(payload) {
        try {
            let result = null;
            let lastError = null;
            const originalTranscript = payload.transcript || "Conversation started.";
            const session = await this.getOrCreateSession(payload.userId);
            payload.history = this.buildHistoryContext(session);
            payload.transcript = originalTranscript;
            const providers = this.provideSwitch(payload, true);
            for (const provider of providers) {
                try {
                    result = await provider.fn();
                    if (result && result.response) {
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
                }
                catch (error) {
                    lastError = error;
                }
            }
            throw new routing_controllers_1.BadRequestError(lastError || "Failed to generate response");
        }
        catch (error) {
            throw error;
        }
    }
    async transcript(payload, file) {
        const sessionId = payload.userId ?? (0, nanoid_1.nanoid)();
        payload.userId = sessionId;
        const room = (0, services_1.userRoom)(sessionId);
        const eventName = `assistance-progress`;
        try {
            if (!file)
                throw new routing_controllers_1.BadRequestError("No audio file provided");
            this.wsService.emitToRoom(room, eventName, {
                status: "transcribing",
                sender: "ai",
                text: "Converting audio to text...",
                message: "Converting audio to text...",
            });
            const { openai } = await this.keyService.getKeys(payload.userId);
            if (!openai)
                throw new routing_controllers_1.BadRequestError("OpenAI API key is required");
            const text = await this.openAIService.transcribeAudio(file.buffer, openai);
            this.wsService.emitToRoom(room, eventName, {
                status: "transcribed",
                sender: "user",
                text,
                message: "Audio transcribed successfully.",
            });
            payload.transcript = text;
            this.wsService.emitToRoom(room, eventName, {
                status: "generating_response",
                sender: "ai",
                text: "Generating AI response...",
                message: "Generating AI response...",
            });
            const response = await this.assistance(payload);
            this.wsService.emitToRoom(room, eventName, {
                status: "completed",
                sender: "ai",
                text: response,
                message: "assistance completed successfully.",
            });
        }
        catch (error) {
            this.wsService.emitToRoom(room, eventName, {
                status: "error",
                sender: "ai",
                text: error.message || "An error occurred",
                message: error.message || "An error occurred",
            });
            throw error;
        }
    }
    executeFlow(input, provider, promptFn, flowName) {
        const flow = provider.defineFlow({
            name: `${flowName}-${(0, nanoid_1.nanoid)()}`,
            inputSchema: input_1.assistanceInputSchema,
            outputSchema: input_1.assistanceOutputSchema,
        }, async (flowInput) => {
            try {
                const { output } = await promptFn(flowInput);
                return { response: output?.response || "" };
            }
            catch (error) {
                console.log(`Error in ${flowName}:`, error);
                throw error;
            }
        });
        return flow(input);
    }
    provideSwitch(payload, isInterview = false) {
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
};
exports.InterviewService = InterviewService;
exports.InterviewService = InterviewService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [services_1.OpenAIService,
        services_1.WebSocketService,
        key_service_1.KeyService])
], InterviewService);
//# sourceMappingURL=interview.service.js.map