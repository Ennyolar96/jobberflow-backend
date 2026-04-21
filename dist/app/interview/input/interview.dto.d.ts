import { InterviewInterface, interviews } from "./interview.interface";
export declare class Interview implements InterviewInterface {
    userId: string;
    cvText: string;
    transcript?: string;
    jobDescription: string;
    role: string;
    company: string;
    tone: "confident" | "hunble" | "assertive";
}
export declare class Interviews implements interviews {
    userId: string;
    page: number;
    limit: number;
}
