"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentService = void 0;
const mammoth_1 = __importDefault(require("mammoth"));
const pdf_parse_1 = require("pdf-parse");
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
let DocumentService = class DocumentService {
    async extractText(fileBuffer, mimetype) {
        try {
            if (mimetype === "application/pdf") {
                const parser = new pdf_parse_1.PDFParse({ data: fileBuffer });
                const data = await parser.getText();
                return data.text;
            }
            else if (mimetype ===
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
                mimetype === "application/msword") {
                const data = await mammoth_1.default.extractRawText({ buffer: fileBuffer });
                return data.value;
            }
            else {
                throw new routing_controllers_1.ForbiddenError("Unsupported file type. Please upload a PDF or DOCX file.");
            }
        }
        catch (error) {
            throw new routing_controllers_1.InternalServerError(`Failed to extract text from document: ${error.message}`);
        }
    }
};
exports.DocumentService = DocumentService;
exports.DocumentService = DocumentService = __decorate([
    (0, typedi_1.Service)()
], DocumentService);
//# sourceMappingURL=extract.service.js.map