import handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";
import { resolve } from "node:path";
import { readFile } from "node:fs/promises";

import {
  MailProvider,
  SendMailData,
  SendAuthenticationLinkMailData,
} from "../mail-provider";
import { env } from "~/config";

enum MailTemplates {
  AuthenticationLink = "authentication-link.hbs",
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
    const file = await readFile(path, {
      encoding: "utf-8",
    });

    const parsedTemplate = handlebars.compile(file);

    return parsedTemplate(variables);
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
      content: `Hello, ${data.name}! Your link to authenticate`,
      to: data.email,
      html,
    });
  }
}
