import {
  MailProvider,
  SendAuthenticationLinkMailData,
  SendMailData,
  SendWelcomeMailData,
} from "../mail-provider";

export class FakeMailProvider implements MailProvider {
  public async sendAuthenticationLinkMail(
    data: SendAuthenticationLinkMailData
  ): Promise<void> {}

  public async sendMail(data: SendMailData): Promise<void> {}

  public async sendWelcomeMail(data: SendWelcomeMailData): Promise<void> {}
}
