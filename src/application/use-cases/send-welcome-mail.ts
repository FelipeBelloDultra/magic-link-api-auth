import { MailProvider } from "~/infra/providers/mail/mail-provider";

interface SendWelcomeMailRequest {
  name: string;
  email: string;
}

export class SendWelcomeMail {
  constructor(private readonly mailProvider: MailProvider) {}

  public async execute({ email, name }: SendWelcomeMailRequest): Promise<void> {
    await this.mailProvider.sendWelcomeMail({
      email,
      name,
    });
  }
}
