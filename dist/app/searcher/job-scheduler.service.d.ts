import { OnModuleDestroy, OnModuleInit } from "../../global/utils";
import { MailerService } from "../../global/services";
import { JobSearchAgent } from "./job-search.agent";
export declare class JobSchedulerService implements OnModuleInit, OnModuleDestroy {
    private readonly agent;
    private readonly mailer;
    private task;
    constructor(agent: JobSearchAgent, mailer: MailerService);
    onModuleInit(): void;
    onModuleDestroy(): void;
    runOnce(): Promise<void>;
}
