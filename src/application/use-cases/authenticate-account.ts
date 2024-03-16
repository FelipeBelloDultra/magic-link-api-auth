import { inject, injectable } from "tsyringe";
import { randomUUID } from "node:crypto";

import { QueueProvider } from "~/infra/providers/queue/queue-provider";
import { AccountRepository } from "../repository/account-repository";
import { AccountTokenRepository } from "../repository/account-token-repository";

interface AuthenticateAccountRequest {
  email: string;
}

@injectable()
export class AuthenticateAccount {
  constructor(
    @inject("AccountRepository")
    private readonly accountRepository: AccountRepository,

    @inject("AccountTokenRepository")
    private readonly accountTokenRepository: AccountTokenRepository,

    @inject("AuthenticateMailQueueProvider")
    private readonly authenticateMailQueueProvider: QueueProvider
  ) {}

  public async execute({ email }: AuthenticateAccountRequest): Promise<void> {
    const account = await this.accountRepository.findByEmail(email);
    if (!account) {
      return;
    }

    const GENERATED_TOKEN = randomUUID();
    const CURRENT_DATE = new Date();
    const EXPIRES_MINUTES = 15;
    CURRENT_DATE.setMinutes(CURRENT_DATE.getMinutes() + EXPIRES_MINUTES); // Current date + 15 minutes

    await this.accountTokenRepository.invalidateManyByEmail(account.email);
    const accountToken = await this.accountTokenRepository.create({
      email: account.email,
      account_id: account.id,
      token: GENERATED_TOKEN,
      expires_at: CURRENT_DATE,
    });

    await this.authenticateMailQueueProvider.addJob({
      email,
      name: account.name,
      expiresInMinutes: EXPIRES_MINUTES,
      token: accountToken.token,
    });
  }
}
