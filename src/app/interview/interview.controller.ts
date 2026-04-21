import { loadSingle } from "@/global/common";
import { Request } from "express";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  QueryParams,
  Req,
  UseBefore,
} from "routing-controllers";
import { Service } from "typedi";
import { Interview, Interviews } from "./input";
import { InterviewService } from "./interview.service";

@Service()
@Controller("/")
export class InterviewController {
  constructor(private readonly interviewService: InterviewService) {}

  @Post("interview")
  public async interview(@Body() data: Interview) {
    const response = await this.interviewService.interview(data);
    return { response };
  }

  @Post("transcript")
  @UseBefore(loadSingle)
  public async transcript(@Body() data: Interview, @Req() req: Request) {
    if (req.body && req.file) {
      // Fire and forget (background task)
      this.interviewService.transcript(req.body, req.file).catch((err) => {
        console.error("Background Transcription Task Error:", err);
      });
    }
    return { success: true, message: "Transcription started" };
  }

  @Delete("clear-history/:userid")
  public async clearHistory(@Param("userid") userId: string) {
    if (!userId) return;
    await this.interviewService.clearHistory(userId);
    return { success: true, message: "History cleared" };
  }

  @Get("interviews")
  public async interviews(@QueryParams() data: Interviews) {
    const response = await this.interviewService.interviews(data);
    return { response };
  }
}
