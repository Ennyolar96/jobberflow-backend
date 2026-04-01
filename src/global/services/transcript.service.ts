import ffmpegStatic from "ffmpeg-static";
import ffmpeg from "fluent-ffmpeg";
import { createReadStream, writeFileSync } from "fs";
import OpenAI from "openai";
import { tmpdir } from "os";
import path from "path";
import { InternalServerError } from "routing-controllers";
import { Service } from "typedi";
import { v4 as uuid } from "uuid";

ffmpeg.setFfmpegPath(ffmpegStatic);

@Service()
export class OpenAIService {
  constructor() {}

  public async transcribeAudio(
    fileBuffer: Buffer,
    openAiKey: string,
  ): Promise<string> {
    try {
      const openai = new OpenAI({ apiKey: openAiKey });
      const convertedPath = await this.convertToMp3(fileBuffer);
      const fileStream = createReadStream(convertedPath);
      const file = await OpenAI.toFile(fileStream, "audio.mp3");

      const response = await openai.audio.transcriptions.create({
        file,
        model: "whisper-1",
      });

      return response.text;
    } catch (error: any) {
      throw new InternalServerError(`Transcription failed: ${error.message}`);
    }
  }

  public async convertToMp3(buffer: Buffer): Promise<string> {
    const inputPath = path.join(tmpdir(), `${uuid()}.3gp`);
    const outputPath = path.join(tmpdir(), `${uuid()}.mp3`);

    writeFileSync(inputPath, buffer);

    return new Promise((resolve, reject) => {
      ffmpeg(inputPath)
        .toFormat("mp3")
        .on("end", () => resolve(outputPath))
        .on("error", reject)
        .save(outputPath);
    });
  }

  public async convertToWav(buffer: Buffer): Promise<string> {
    const inputPath = path.join(tmpdir(), `${uuid()}.3gp`);
    const outputPath = path.join(tmpdir(), `${uuid()}.wav`);

    writeFileSync(inputPath, buffer);

    return new Promise((resolve, reject) => {
      ffmpeg(inputPath)
        .toFormat("wav")
        .on("end", () => resolve(outputPath))
        .on("error", reject)
        .save(outputPath);
    });
  }
}
