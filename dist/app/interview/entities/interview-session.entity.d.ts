import { BaseEntity } from "../../../global/common";
export interface InterviewTurn {
    speaker: "Candidate" | "Interviewer";
    text: string;
    timestamp: number;
}
export declare const MAX_INTERVIEW_TURNS = 20;
export declare class InterviewSession extends BaseEntity {
    userId: string;
    turns: string;
    getTurns(): InterviewTurn[];
    setTurns(turns: InterviewTurn[]): void;
    toHistoryString(): string;
}
