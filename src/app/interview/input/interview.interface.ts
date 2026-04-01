export interface InterviewInterface {
  userId: string;
  transcript?: string;
  cvText: string;
  jobDescription: string;
  role: string;
  company: string;
  tone: "confident" | "hunble" | "assertive";
}
