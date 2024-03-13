import { QueueProvider } from "~/infra/providers/queue/queue-provider";
import { AccountRepository } from "../repository/account-repository";

import { EmailAlreadyUsedError } from "./errors/email-alreay-used-error";

interface CreateAccountRequest {
  name: string;
  email: string;
  icon_url: string;
}

export class CreateAccount {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly welcomeMailQueueProvider: QueueProvider
  ) {}

  public async execute({
    email,
    icon_url,
    name,
  }: CreateAccountRequest): Promise<void> {
    const account = await this.accountRepository.findByEmail(email);

    if (account) {
      throw new EmailAlreadyUsedError();
    }

    await this.accountRepository.create({
      email,
      icon_url,
      name,
    });
    await this.welcomeMailQueueProvider.addJob({
      name,
      email,
    });
  }
}
