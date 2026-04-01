import { BaseEntity } from "@/global/common";
import { Column, Entity, Index } from "typeorm";

export interface InterviewTurn {
  speaker: "Candidate" | "Interviewer";
  text: string;
  timestamp: number;
}

/** Maximum number of conversation turns to retain per session (controls token/prompt size). */
export const MAX_INTERVIEW_TURNS = 20;

@Entity("interview_sessions")
export class InterviewSession extends BaseEntity {
  @Index()
  @Column({ unique: true })
  userId: string;

  /**
   * Stored as JSON: InterviewTurn[]
   * Capped at MAX_INTERVIEW_TURNS entries — older turns are dropped automatically.
   */
  @Column({ type: "text", default: "[]" })
  turns: string;

  getTurns(): InterviewTurn[] {
    try {
      return JSON.parse(this.turns) as InterviewTurn[];
    } catch {
      return [];
    }
  }

  setTurns(turns: InterviewTurn[]) {
    // Keep only the last MAX_INTERVIEW_TURNS to prevent unbounded growth
    const capped = turns.slice(-MAX_INTERVIEW_TURNS);
    this.turns = JSON.stringify(capped);
  }

  /**
   * Formats stored turns into a plain-text transcript string for the AI prompt.
   * Older turns beyond the cap are excluded automatically.
   */
  toHistoryString(): string {
    return this.getTurns()
      .map((t) => `${t.speaker}: ${t.text}`)
      .join("\n")
      .concat(this.getTurns().length > 0 ? "\n" : "");
  }
}
