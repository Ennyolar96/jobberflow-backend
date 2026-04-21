import { OpenAIService, WebSocketService } from "../../global/services";
import { KeyService } from "../keys/key.service";
import { InterviewSession } from "./entities";
import { assistanceInput, interviews } from "./input";
export declare class InterviewService {
    private readonly openAIService;
    private readonly wsService;
    private readonly keyService;
    private readonly sessionRepository;
    constructor(openAIService: OpenAIService, wsService: WebSocketService, keyService: KeyService);
    private getOrCreateSession;
    private appendTurns;
    private buildHistoryContext;
    clearHistory(userId: string): Promise<void>;
    assistance(payload: assistanceInput): Promise<string>;
    interview(payload: assistanceInput): Promise<string>;
    interviews(payload: interviews): Promise<{
        session: InterviewSession[];
    }>;
    transcript(payload: assistanceInput, file: Express.Multer.File): Promise<void>;
    private provider;
    private executeFlow;
    private provideSwitch;
}
