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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResumeService = void 0;
const config_1 = require("../../config");
const services_1 = require("../../global/services");
const nanoid_1 = require("nanoid");
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const input_1 = require("./input");
const key_service_1 = require("../keys/key.service");
const template_1 = require("./template");
let ResumeService = class ResumeService {
    constructor(documentService, pdfService, keyService) {
        this.documentService = documentService;
        this.pdfService = pdfService;
        this.keyService = keyService;
        this.extractText = async (file) => {
            try {
                if (!file)
                    throw new routing_controllers_1.ForbiddenError("PDF/DOCX is required");
                const text = await this.documentService.extractText(file.buffer, file.mimetype);
                return text;
            }
            catch (error) {
                throw error;
            }
        };
        this.rewriteResume = async (payload) => {
            try {
                let result = null;
                let lastError = null;
                const referenceTemplate = (0, template_1.getTemplate)(payload.referenceTemplate);
                const providers = this.provideSwitch({
                    ...payload,
                    referenceTemplate,
                });
                for (const provider of providers) {
                    try {
                        console.log(`Running flow with ${provider.name}`);
                        result = await provider.fn();
                        if (result && result.response) {
                            console.log(`Flow completed with ${provider.name}`);
                            break;
                        }
                    }
                    catch (error) {
                        console.log(`Error in ${provider.name}:`, error);
                        lastError = error;
                    }
                }
                if (!result || !result.response) {
                    throw new routing_controllers_1.BadRequestError(lastError instanceof Error
                        ? lastError.message
                        : lastError || "Failed to generate response");
                }
                return result.response;
            }
            catch (error) {
                console.log(`Error in CV Rewrite:`, error);
                throw error;
            }
        };
        this.downloadResume = async (payload) => {
            try {
                const fullHtml = `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>Resume</title>
          </head>
          <body>
            ${payload.html || "<div>No Resume Generated</div>"}
          </body>
        </html>
      `;
                return this.pdfService.generatePDF(fullHtml);
            }
            catch (error) {
                throw error;
            }
        };
        this.provider = {
            openai: async (input) => {
                const { openai } = await this.keyService.getKeys(input.userId);
                if (!openai)
                    throw new routing_controllers_1.BadRequestError("OpenAI API key is required");
                const provider = (0, config_1.createProvider)(openai, "openai");
                const prompt = provider.definePrompt(input_1.resumePrompt);
                return this.executeFlow(input, provider, prompt, "resume-with-openai");
            },
            gemini: async (input) => {
                const { gemini } = await this.keyService.getKeys(input.userId);
                if (!gemini)
                    throw new routing_controllers_1.BadRequestError("Gemini API key is required");
                const provider = (0, config_1.createProvider)(gemini, "gemini");
                const prompt = provider.definePrompt(input_1.resumePrompt);
                return this.executeFlow(input, provider, prompt, "resume-with-gemini");
            },
        };
    }
    executeFlow(input, provider, promptFn, flowName) {
        const flow = provider.defineFlow({
            name: `${flowName}-${(0, nanoid_1.nanoid)()}`,
            inputSchema: input_1.resumeInputSchema,
            outputSchema: input_1.resumeOutputSchema,
        }, async (flowInput) => {
            try {
                const { output } = await promptFn(flowInput);
                return { response: output?.response || "" };
            }
            catch (error) {
                console.log(`Error in ${flowName}:`, error);
                throw error;
            }
        });
        return flow(input);
    }
    provideSwitch(payload) {
        const { provider, ...rest } = payload;
        const providers = [
            { name: "OpenAI", id: "openai", fn: () => this.provider.openai(rest) },
            { name: "Gemini", id: "gemini", fn: () => this.provider.gemini(rest) },
        ];
        const selectedIndex = providers.findIndex((p) => p.id === provider);
        if (selectedIndex !== -1) {
            const [selected] = providers.splice(selectedIndex, 1);
            return [selected, ...providers];
        }
        return providers.sort(() => Math.random() - 0.5);
    }
};
exports.ResumeService = ResumeService;
exports.ResumeService = ResumeService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [services_1.DocumentService,
        services_1.PdfService,
        key_service_1.KeyService])
], ResumeService);
//# sourceMappingURL=resume.service.js.map