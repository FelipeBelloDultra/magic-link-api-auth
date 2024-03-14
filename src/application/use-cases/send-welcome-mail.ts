import { inject, injectable } from "tsyringe";

import { MailProvider } from "~/infra/providers/mail/mail-provider";

interface SendWelcomeMailRequest {
  name: string;
  email: string;
}

@injectable()
export class SendWelcomeMail {
  constructor(
    @inject("MailProvider")
    private readonly mailProvider: MailProvider
  ) {}

  public async execute({ email, name }: SendWelcomeMailRequest): Promise<void> {
    await this.mailProvider.sendWelcomeMail({
      email,
      name,
    });
  }
}
