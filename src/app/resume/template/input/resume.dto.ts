import { IsIn, IsNotEmpty, IsString } from "class-validator";
import { Template } from "..";
import { IResume, IResumeDownload } from "./resume.interface";

export class ResumeRewrite implements IResume {
  @IsString()
  @IsNotEmpty()
  resume: string;

  @IsString()
  @IsNotEmpty()
  jobDescription: string;

  @IsString()
  @IsIn(Object.values(Template))
  referenceTemplate: Template;

  @IsString()
  @IsNotEmpty()
  userId: string;
}

export class ResumeDownload implements IResumeDownload {
  @IsString()
  @IsNotEmpty()
  html: string;
}
