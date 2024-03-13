import handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";
import { resolve, join } from "node:path";
import { createReadStream, createWriteStream } from "node:fs";
import { randomUUID } from "node:crypto";

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
  private readonly transporter: Transporter | undefined = undefined;

  constructor() {
    if (env.MAIL_DRIVER === "mail") {
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

  private createLocalFile({ html, to }: { to: string; html: string }) {
    const uuid = randomUUID();
    const filename = `${uuid}-${env.MAIL_FROM_ADDRESS}-${to}.html`;
    const path = join(__dirname, "..", "tmp", filename);

    const writableStream = createWriteStream(path, {
      encoding: "utf-8",
    });
    writableStream.write(html);
    writableStream.end();
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
    if (this.transporter) {
      await this.transporter.sendMail({
        from: env.MAIL_FROM_ADDRESS,
        to: data.to,
        subject: data.content,
        html: data.html,
      });
      return;
    }

    this.createLocalFile({
      html: data.html,
      to: data.to,
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
