import { Request } from "express";
import { Interview } from "./input/interview.dto";
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
}
