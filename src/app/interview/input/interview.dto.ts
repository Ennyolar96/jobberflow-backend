import { IsIn, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { InterviewInterface } from "./interview.interface";

export class Interview implements InterviewInterface {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  cvText: string;

  @IsOptional()
  @IsString()
  transcript?: string;

  @IsString()
  @IsNotEmpty()
  jobDescription: string;

  @IsString()
  @IsNotEmpty()
  role: string;

  @IsString()
  @IsNotEmpty()
  company: string;

  @IsString()
  @IsIn(["confident", "hunble", "assertive"])
  tone: "confident" | "hunble" | "assertive"; //"professional" | "casual" | "strict";
}
