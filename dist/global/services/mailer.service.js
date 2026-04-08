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
exports.MailerService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const typedi_1 = require("typedi");
const utils_1 = require("../../global/utils");
let MailerService = class MailerService {
    constructor() {
        this.transporter = null;
    }
    getTransporter() {
        if (this.transporter)
            return this.transporter;
        const host = process.env.SMTP_HOST;
        const port = Number(process.env.SMTP_PORT ?? 587);
        const user = process.env.SMTP_USER;
        const pass = process.env.SMTP_PASS;
        if (!host || !user || !pass) {
            throw new Error("Missing SMTP config. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS.");
        }
        this.transporter = nodemailer_1.default.createTransport({
            host,
            port,
            secure: port === 465,
            auth: { user, pass },
        });
        return this.transporter;
    }
    async send(input) {
        const from = process.env.EMAIL_FROM;
        if (!from) {
            throw new Error("Missing EMAIL_FROM env var.");
        }
        const to = Array.isArray(input.to) ? input.to.join(",") : input.to;
        await this.getTransporter().sendMail({
            from,
            to,
            subject: input.subject,
            text: input.text,
            html: input.html,
        });
        utils_1.logger.info(`Email sent to ${to} (${input.subject})`);
    }
};
exports.MailerService = MailerService;
exports.MailerService = MailerService = __decorate([
    (0, typedi_1.Service)()
], MailerService);
//# sourceMappingURL=mailer.service.js.map