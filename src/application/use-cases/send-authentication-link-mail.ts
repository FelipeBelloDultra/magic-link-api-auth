import { inject, injectable } from "tsyringe";

import { MailProvider } from "~/infra/providers/mail/mail-provider";

import { env } from "~/config";

interface SendAuthenticationLinkMailRequest {
  email: string;
  name: string;
  expiresInMinutes: number;
  token: string;
}

@injectable()
export class SendAuthenticationLinkMail {
  constructor(
    @inject("MailProvider")
    private readonly mailProvider: MailProvider
  ) {}

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
