import { Request } from "express";
import { Interview, Interviews } from "./input";
import { InterviewService } from "./interview.service";
export declare class InterviewController {
    private readonly interviewService;
    constructor(interviewService: InterviewService);
    interview(data: Interview): Promise<{
        response: string;
    }>;
    transcript(data: Interview, req: Request): Promise<{
        success: boolean;
        message: string;
    }>;
    clearHistory(userId: string): Promise<{
        success: boolean;
        message: string;
    }>;
    interviews(data: Interviews): Promise<{
        response: {
            session: import("./entities").InterviewSession[];
        };
    }>;
}
