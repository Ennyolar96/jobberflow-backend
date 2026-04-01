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
exports.ResumeController = void 0;
const common_1 = require("../../global/common");
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const input_1 = require("./input");
const resume_service_1 = require("./resume.service");
let ResumeController = class ResumeController {
    constructor(resumeService) {
        this.resumeService = resumeService;
    }
    async rewriteResume(payload) {
        return this.resumeService.rewriteResume(payload);
    }
    async extractText(req) {
        if (!req.file) {
            throw new routing_controllers_1.BadRequestError("Document file is required (PDF/DOCX)");
        }
        return this.resumeService.extractText(req.file);
    }
    async downloadPDF(payload, res) {
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
};
exports.ResumeController = ResumeController;
__decorate([
    (0, routing_controllers_1.Post)("optimize"),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [input_1.ResumeRewrite]),
    __metadata("design:returntype", Promise)
], ResumeController.prototype, "rewriteResume", null);
__decorate([
    (0, routing_controllers_1.Post)("extract"),
    (0, routing_controllers_1.UseBefore)(common_1.loadSingle),
    __param(0, (0, routing_controllers_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ResumeController.prototype, "extractText", null);
__decorate([
    (0, routing_controllers_1.Post)("download"),
    __param(0, (0, routing_controllers_1.Body)()),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [input_1.ResumeDownload, Object]),
    __metadata("design:returntype", Promise)
], ResumeController.prototype, "downloadPDF", null);
exports.ResumeController = ResumeController = __decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.Controller)("/"),
    __metadata("design:paramtypes", [resume_service_1.ResumeService])
], ResumeController);
//# sourceMappingURL=resume.controller.js.map