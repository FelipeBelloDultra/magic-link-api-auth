import { randomUUID } from "node:crypto";
import { AccountTokens, Prisma } from "@prisma/client";

import { AccountTokenRepository } from "../account-token-repository";

export class InMemoryAccountTokenRepository implements AccountTokenRepository {
  private readonly accountTokens: AccountTokens[] = [];

  public async findByToken(token: string): Promise<AccountTokens | null> {
    const accountToken = this.accountTokens.find(
      (accountToken) => accountToken.token === token
    );

    return accountToken ? accountToken : null;
  }

  public async invalidateManyByEmail(email: string): Promise<void> {
    this.accountTokens.forEach((accountToken) => {
      if (accountToken.email === email) {
        accountToken.is_valid = false;
      }
    });
  }

  public async invalidateOneByToken(token: string): Promise<void> {
    this.accountTokens.forEach((accountToken) => {
      if (accountToken.token === token) {
        accountToken.is_valid = false;
      }
    });
  }

  public async create(
    createAccountToken: Prisma.AccountTokensCreateInput
  ): Promise<AccountTokens> {
    const accountToken: AccountTokens = {
      id: randomUUID(),
      email: createAccountToken.email,
      token: createAccountToken.token,
      account_id: createAccountToken.account_id,
      is_valid: true,
      expires_at: new Date(createAccountToken.expires_at),
      created_at: new Date(),
    };

    this.accountTokens.push(accountToken);
    return accountToken;
  }
}
