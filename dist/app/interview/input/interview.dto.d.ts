import { InterviewInterface } from "./interview.interface";
export declare class Interview implements InterviewInterface {
    userId: string;
    cvText: string;
    transcript?: string;
    jobDescription: string;
    role: string;
    company: string;
    tone: "confident" | "hunble" | "assertive";
}
