import { Template } from "..";
import { IResume, IResumeDownload } from "./resume.interface";
export declare class ResumeRewrite implements IResume {
    resume: string;
    jobDescription: string;
    referenceTemplate: Template;
    userId: string;
}
export declare class ResumeDownload implements IResumeDownload {
    html: string;
}
