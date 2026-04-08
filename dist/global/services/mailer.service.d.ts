export type SendEmailInput = {
    to: string | string[];
    subject: string;
    text?: string;
    html?: string;
};
export declare class MailerService {
    private transporter;
    private getTransporter;
    send(input: SendEmailInput): Promise<void>;
}
