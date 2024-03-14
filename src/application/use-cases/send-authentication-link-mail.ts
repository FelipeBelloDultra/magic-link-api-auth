import { MailProvider } from "~/infra/providers/mail/mail-provider";

import { env } from "~/config";

interface SendAuthenticationLinkMailRequest {
  email: string;
  name: string;
  expiresInMinutes: number;
  token: string;
}

export class SendAuthenticationLinkMail {
  constructor(private readonly mailProvider: MailProvider) {}

  public async execute({
    email,
    name,
    expiresInMinutes,
    token,
  }: SendAuthenticationLinkMailRequest): Promise<void> {
    const link = `${env.FRONTEND_DOMAIN}/auth/verify/${token}`;

    await this.mailProvider.sendAuthenticationLinkMail({
      link,
      expiresInMinutes,
      email,
      name,
    });
  }
}
