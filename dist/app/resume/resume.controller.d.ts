import { Request, Response } from "express";
import { ResumeDownload, ResumeRewrite } from "./input";
import { ResumeService } from "./resume.service";
export declare class ResumeController {
    private readonly resumeService;
    constructor(resumeService: ResumeService);
    rewriteResume(payload: ResumeRewrite): Promise<string>;
    extractText(req: Request): Promise<string>;
    downloadPDF(payload: ResumeDownload, res: Response): Promise<Response<any, Record<string, any>>>;
}
