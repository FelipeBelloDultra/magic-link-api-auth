import { randomUUID } from "node:crypto";

import { QueueProvider } from "~/infra/providers/queue/queue-provider";
import { AccountRepository } from "../repository/account-repository";
import { AccountTokenRepository } from "../repository/account-token-repository";

interface AuthenticateAccountRequest {
  email: string;
}

export class AuthenticateAccount {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly accountTokenRepository: AccountTokenRepository,
    private readonly authenticateMailQueueProvider: QueueProvider
  ) {}

  public async execute({ email }: AuthenticateAccountRequest): Promise<void> {
    const account = await this.accountRepository.findByEmail(email);

    if (!account) {
      return;
    }

    const token = randomUUID();
    const date = new Date();
    const EXPIRES_MINUTES = 15;
    date.setMinutes(date.getMinutes() + EXPIRES_MINUTES); // Current date + 15 minutes

    const accountToken = await this.accountTokenRepository.create({
      email,
      token,
      expires_at: date,
    });

    await this.authenticateMailQueueProvider.addJob({
      email,
      name: account.name,
      expiresInMinutes: EXPIRES_MINUTES,
      token: accountToken.token,
    });
  }
}
