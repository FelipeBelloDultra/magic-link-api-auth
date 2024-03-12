import nodemailer, { Transporter } from "nodemailer";

import { MailProvider, SendMailData } from "../mail-provider";
import { env } from "~/config";

export class NodemailerMailProvider implements MailProvider {
  private readonly transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      secure: false,
      host: env.MAIL_HOST,
      port: env.MAIL_PORT,
      auth: {
        user: env.MAIL_USERNAME,
        pass: env.MAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  public async sendMail(data: SendMailData): Promise<void> {
    await this.transporter.sendMail({
      from: env.MAIL_FROM_ADDRESS,
      to: data.toEmail,
      subject: data.content,
      html: data.content,
    });
  }
}
