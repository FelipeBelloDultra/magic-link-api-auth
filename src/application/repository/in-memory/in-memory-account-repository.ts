import { randomUUID } from "node:crypto";
import { Account, Prisma } from "@prisma/client";

import { AccountRepository } from "../account-repository";

export class InMemoryAccountRepository implements AccountRepository {
  private readonly accounts: Account[] = [];

  public async create(
    createAccountData: Prisma.AccountCreateInput
  ): Promise<Account> {
    const account: Account = {
      created_at: new Date(),
      email: createAccountData.email,
      icon_url: createAccountData.icon_url,
      name: createAccountData.name,
      id: randomUUID(),
      updated_at: new Date(),
    };

    this.accounts.push(account);
    return account;
  }

  public async findByEmail(email: string): Promise<Account | null> {
    const account = this.accounts.find((account) => account.email === email);

    return account ? account : null;
  }
}
