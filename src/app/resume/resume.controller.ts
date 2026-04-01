import { loadSingle } from "@/global/common";
import { Request, Response } from "express";
import {
  BadRequestError,
  Body,
  Controller,
  Post,
  Req,
  Res,
  UseBefore,
} from "routing-controllers";
import { Service } from "typedi";
import { ResumeDownload, ResumeRewrite } from "./input";
import { ResumeService } from "./resume.service";

@Service()
@Controller("/")
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @Post("optimize")
  public async rewriteResume(@Body() payload: ResumeRewrite) {
    return this.resumeService.rewriteResume(payload);
  }

  @Post("extract")
  @UseBefore(loadSingle)
  public async extractText(@Req() req: Request) {
    if (!req.file) {
      throw new BadRequestError("Document file is required (PDF/DOCX)");
    }
    return this.resumeService.extractText(req.file);
  }

  @Post("download")
  public async downloadPDF(
    @Body() payload: ResumeDownload,
    @Res() res: Response,
  ) {
    const result = await this.resumeService.downloadResume(payload);

    if (!result.success || !result.document) {
      return res.status(500).json({
        success: false,
        message: result.message || "Failed to generate PDF",
      });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `Resume_${timestamp}.pdf`;

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.setHeader("Content-Length", result.document.length.toString());

    res.end(Buffer.from(result.document));
    return res;
  }
}
