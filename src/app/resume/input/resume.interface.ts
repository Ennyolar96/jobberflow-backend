import { Template } from "../template";

export interface IResume {
  resume: string;
  jobDescription: string;
  referenceTemplate: Template;
  userId: string;
}

export interface IResumeDownload {
  html: string;
}
