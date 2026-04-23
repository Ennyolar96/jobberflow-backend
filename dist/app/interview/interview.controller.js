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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterviewController = void 0;
const common_1 = require("../../global/common");
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const input_1 = require("./input");
const interview_service_1 = require("./interview.service");
let InterviewController = class InterviewController {
    constructor(interviewService) {
        this.interviewService = interviewService;
    }
    async interview(data) {
        const response = await this.interviewService.interview(data);
        return { response };
    }
    async transcript(data, req) {
        if (req.body && req.file) {
            this.interviewService.transcript(req.body, req.file).catch((err) => {
                console.error("Background Transcription Task Error:", err);
            });
        }
        return { success: true, message: "Transcription started" };
    }
    async assistance(data) {
        return this.interviewService.assistance(data);
    }
    async clearHistory(userId) {
        if (!userId)
            return;
        await this.interviewService.clearHistory(userId);
        return { success: true, message: "History cleared" };
    }
    async interviews(data) {
        const response = await this.interviewService.interviews(data);
        return { response };
    }
};
exports.InterviewController = InterviewController;
__decorate([
    (0, routing_controllers_1.Post)("interview"),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [input_1.Interview]),
    __metadata("design:returntype", Promise)
], InterviewController.prototype, "interview", null);
__decorate([
    (0, routing_controllers_1.Post)("transcript"),
    (0, routing_controllers_1.UseBefore)(common_1.loadSingle),
    __param(0, (0, routing_controllers_1.Body)()),
    __param(1, (0, routing_controllers_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [input_1.Interview, Object]),
    __metadata("design:returntype", Promise)
], InterviewController.prototype, "transcript", null);
__decorate([
    (0, routing_controllers_1.Post)("assistance/resend"),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [input_1.Interview]),
    __metadata("design:returntype", Promise)
], InterviewController.prototype, "assistance", null);
__decorate([
    (0, routing_controllers_1.Delete)("clear-history/:userid"),
    __param(0, (0, routing_controllers_1.Param)("userid")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InterviewController.prototype, "clearHistory", null);
__decorate([
    (0, routing_controllers_1.Get)("interviews"),
    __param(0, (0, routing_controllers_1.QueryParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [input_1.Interviews]),
    __metadata("design:returntype", Promise)
], InterviewController.prototype, "interviews", null);
exports.InterviewController = InterviewController = __decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.Controller)("/"),
    __metadata("design:paramtypes", [interview_service_1.InterviewService])
], InterviewController);
//# sourceMappingURL=interview.controller.js.map