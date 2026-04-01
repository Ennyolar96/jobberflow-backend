"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAIService = void 0;
const ffmpeg_static_1 = __importDefault(require("ffmpeg-static"));
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
const fs_1 = require("fs");
const openai_1 = __importDefault(require("openai"));
const os_1 = require("os");
const path_1 = __importDefault(require("path"));
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const uuid_1 = require("uuid");
fluent_ffmpeg_1.default.setFfmpegPath(ffmpeg_static_1.default);
let OpenAIService = class OpenAIService {
    constructor() { }
    async transcribeAudio(fileBuffer, openAiKey) {
        try {
            const openai = new openai_1.default({ apiKey: openAiKey });
            const convertedPath = await this.convertToMp3(fileBuffer);
            const fileStream = (0, fs_1.createReadStream)(convertedPath);
            const file = await openai_1.default.toFile(fileStream, "audio.mp3");
            const response = await openai.audio.transcriptions.create({
                file,
                model: "whisper-1",
            });
            return response.text;
        }
        catch (error) {
            throw new routing_controllers_1.InternalServerError(`Transcription failed: ${error.message}`);
        }
    }
    async convertToMp3(buffer) {
        const inputPath = path_1.default.join((0, os_1.tmpdir)(), `${(0, uuid_1.v4)()}.3gp`);
        const outputPath = path_1.default.join((0, os_1.tmpdir)(), `${(0, uuid_1.v4)()}.mp3`);
        (0, fs_1.writeFileSync)(inputPath, buffer);
        return new Promise((resolve, reject) => {
            (0, fluent_ffmpeg_1.default)(inputPath)
                .toFormat("mp3")
                .on("end", () => resolve(outputPath))
                .on("error", reject)
                .save(outputPath);
        });
    }
    async convertToWav(buffer) {
        const inputPath = path_1.default.join((0, os_1.tmpdir)(), `${(0, uuid_1.v4)()}.3gp`);
        const outputPath = path_1.default.join((0, os_1.tmpdir)(), `${(0, uuid_1.v4)()}.wav`);
        (0, fs_1.writeFileSync)(inputPath, buffer);
        return new Promise((resolve, reject) => {
            (0, fluent_ffmpeg_1.default)(inputPath)
                .toFormat("wav")
                .on("end", () => resolve(outputPath))
                .on("error", reject)
                .save(outputPath);
        });
    }
};
exports.OpenAIService = OpenAIService;
exports.OpenAIService = OpenAIService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], OpenAIService);
//# sourceMappingURL=transcript.service.js.map