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
exports.JobSchedulerService = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const typedi_1 = require("typedi");
const utils_1 = require("../../global/utils");
const services_1 = require("../../global/services");
const job_search_agent_1 = require("./job-search.agent");
const job_email_formatter_1 = require("./job-email.formatter");
let JobSchedulerService = class JobSchedulerService {
    constructor(agent, mailer) {
        this.agent = agent;
        this.mailer = mailer;
        this.task = null;
    }
    onModuleInit() {
        const enabled = (process.env.JOB_SEARCH_ENABLED ?? "false").toLowerCase() === "true";
        if (!enabled) {
            utils_1.logger.info("JobSchedulerService disabled (JOB_SEARCH_ENABLED=false)");
            return;
        }
        const schedule = process.env.JOB_SEARCH_CRON || "0 9 * * *";
        if (!node_cron_1.default.validate(schedule)) {
            throw new Error(`Invalid JOB_SEARCH_CRON: ${schedule}`);
        }
        this.task = node_cron_1.default.schedule(schedule, async () => {
            await this.runOnce();
        }, { timezone: process.env.JOB_SEARCH_TZ || "UTC" });
        this.task.start();
        utils_1.logger.info(`JobSchedulerService scheduled: ${schedule} (${process.env.JOB_SEARCH_TZ || "UTC"})`);
    }
    onModuleDestroy() {
        this.task?.stop();
        this.task = null;
    }
    async runOnce() {
        const query = (process.env.JOB_SEARCH_QUERY || "").trim();
        if (!query) {
            utils_1.logger.info("JobSchedulerService skipping: JOB_SEARCH_QUERY is empty");
            return;
        }
        const to = (process.env.EMAIL_TO || "").trim();
        if (!to) {
            utils_1.logger.info("JobSchedulerService skipping: EMAIL_TO is empty");
            return;
        }
        const limit = Number(process.env.JOB_SEARCH_LIMIT ?? 20);
        const location = (process.env.JOB_SEARCH_LOCATION || "").trim() || undefined;
        const result = await this.agent.run({ query, location, limit });
        const email = (0, job_email_formatter_1.formatJobsEmailText)(result);
        const onlyWhenNew = (process.env.JOB_SEARCH_ONLY_WHEN_NEW ?? "true").toLowerCase() === "true";
        if (onlyWhenNew && result.newJobs.length === 0) {
            utils_1.logger.info("JobSchedulerService: no new jobs, not emailing");
            return;
        }
        await this.mailer.send({
            to: to.split(",").map((s) => s.trim()).filter(Boolean),
            subject: email.subject,
            text: email.text,
            html: email.html,
        });
    }
};
exports.JobSchedulerService = JobSchedulerService;
exports.JobSchedulerService = JobSchedulerService = __decorate([
    (0, typedi_1.Service)(),
    (0, utils_1.Lifecycle)(),
    __metadata("design:paramtypes", [job_search_agent_1.JobSearchAgent,
        services_1.MailerService])
], JobSchedulerService);
//# sourceMappingURL=job-scheduler.service.js.map