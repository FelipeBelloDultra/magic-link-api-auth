import { QueueProvider } from "~/infra/providers/queue/queue-provider";
import { AccountRepository } from "../repository/account-repository";

interface AuthenticateAccountRequest {
  email: string;
}

export class AuthenticateAccount {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly authenticateMailQueueProvider: QueueProvider
  ) {}

  public async execute({ email }: AuthenticateAccountRequest): Promise<void> {
    const account = await this.accountRepository.findByEmail(email);

    if (!account) {
      return;
    }

    // Add rule to generate token
    await this.authenticateMailQueueProvider.addJob({});
  }
}
