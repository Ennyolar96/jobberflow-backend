import cron, { ScheduledTask } from "node-cron";
import { Service } from "typedi";
import { Lifecycle, logger, OnModuleDestroy, OnModuleInit } from "@/global/utils";
import { MailerService } from "@/global/services";
import { JobSearchAgent } from "./job-search.agent";
import { formatJobsEmailText } from "./job-email.formatter";

@Service()
@Lifecycle()
export class JobSchedulerService implements OnModuleInit, OnModuleDestroy {
  private task: ScheduledTask | null = null;

  constructor(
    private readonly agent: JobSearchAgent,
    private readonly mailer: MailerService,
  ) {}

  public onModuleInit(): void {
    const enabled = (process.env.JOB_SEARCH_ENABLED ?? "false").toLowerCase() === "true";
    if (!enabled) {
      logger.info("JobSchedulerService disabled (JOB_SEARCH_ENABLED=false)");
      return;
    }

    const schedule = process.env.JOB_SEARCH_CRON || "0 9 * * *"; // daily 9am
    if (!cron.validate(schedule)) {
      throw new Error(`Invalid JOB_SEARCH_CRON: ${schedule}`);
    }

    this.task = cron.schedule(
      schedule,
      async () => {
        await this.runOnce();
      },
      { timezone: process.env.JOB_SEARCH_TZ || "UTC" },
    );

    this.task.start();
    logger.info(`JobSchedulerService scheduled: ${schedule} (${process.env.JOB_SEARCH_TZ || "UTC"})`);
  }

  public onModuleDestroy(): void {
    this.task?.stop();
    this.task = null;
  }

  public async runOnce(): Promise<void> {
    const query = (process.env.JOB_SEARCH_QUERY || "").trim();
    if (!query) {
      logger.info("JobSchedulerService skipping: JOB_SEARCH_QUERY is empty");
      return;
    }

    const to = (process.env.EMAIL_TO || "").trim();
    if (!to) {
      logger.info("JobSchedulerService skipping: EMAIL_TO is empty");
      return;
    }

    const limit = Number(process.env.JOB_SEARCH_LIMIT ?? 20);
    const location = (process.env.JOB_SEARCH_LOCATION || "").trim() || undefined;

    const result = await this.agent.run({ query, location, limit });
    const email = formatJobsEmailText(result);

    const onlyWhenNew = (process.env.JOB_SEARCH_ONLY_WHEN_NEW ?? "true").toLowerCase() === "true";
    if (onlyWhenNew && result.newJobs.length === 0) {
      logger.info("JobSchedulerService: no new jobs, not emailing");
      return;
    }

    await this.mailer.send({
      to: to.split(",").map((s) => s.trim()).filter(Boolean),
      subject: email.subject,
      text: email.text,
      html: email.html,
    });
  }
}

