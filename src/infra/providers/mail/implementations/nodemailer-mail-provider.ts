import handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";
import { resolve } from "node:path";
import { createReadStream } from "node:fs";

import {
  MailProvider,
  SendMailData,
  SendAuthenticationLinkMailData,
  SendWelcomeMailData,
} from "../mail-provider";
import { env } from "~/config";

enum MailTemplates {
  AuthenticationLink = "authentication-link.hbs",
  WelcomeUser = "welcome-user.hbs",
}

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

  private async getEmailTemplate<VariablesToReplace>(
    emailTemplateName: string,
    variables?: VariablesToReplace
  ) {
    const path = resolve(__dirname, "..", "templates", emailTemplateName);
    const templateStream = createReadStream(path, {
      encoding: "utf-8",
    });

    const chunks: Buffer[] = [];
    for await (const chunk of templateStream) {
      chunks.push(Buffer.from(chunk));
    }

    const fileContent = Buffer.concat(chunks).toString("utf-8");
    const parsedTemplate = handlebars.compile(fileContent);

    return parsedTemplate(variables);
  }

  public async sendWelcomeMail(data: SendWelcomeMailData) {
    const html = await this.getEmailTemplate(MailTemplates.WelcomeUser, {
      name: data.name,
    });

    await this.sendMail({
      content: `Welcome, ${data.name}!`,
      to: data.email,
      html,
    });
  }

  public async sendMail(data: SendMailData) {
    await this.transporter.sendMail({
      from: env.MAIL_FROM_ADDRESS,
      to: data.to,
      subject: data.content,
      html: data.html,
    });
  }

  public async sendAuthenticationLinkMail(
    data: SendAuthenticationLinkMailData
  ) {
    const html = await this.getEmailTemplate(MailTemplates.AuthenticationLink, {
      name: data.name,
      link: data.token,
    });

    await this.sendMail({
      content: `Hello, ${data.name}! Your link to authenticate is here.`,
      to: data.email,
      html,
    });
  }
}
