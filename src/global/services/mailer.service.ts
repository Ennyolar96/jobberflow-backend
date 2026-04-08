import nodemailer from "nodemailer";
import { Service } from "typedi";
import { logger } from "@/global/utils";

export type SendEmailInput = {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
};

@Service()
export class MailerService {
  private transporter: nodemailer.Transporter | null = null;

  private getTransporter(): nodemailer.Transporter {
    if (this.transporter) return this.transporter;

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT ?? 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (!host || !user || !pass) {
      throw new Error(
        "Missing SMTP config. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS.",
      );
    }

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    return this.transporter;
  }

  public async send(input: SendEmailInput): Promise<void> {
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

    logger.info(`Email sent to ${to} (${input.subject})`);
  }
}

