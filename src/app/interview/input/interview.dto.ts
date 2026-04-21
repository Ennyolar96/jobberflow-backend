import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from "class-validator";
import { InterviewInterface, interviews } from "./interview.interface";
import { Transform } from "class-transformer";

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

export class Interviews implements interviews {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) =>
    typeof value === "string" ? parseInt(value, 10) : value,
  )
  page: number = 1;

  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(100)
  @Transform(({ value }) =>
    typeof value === "string" ? parseInt(value, 10) : value,
  )
  limit: number = 10;
}
