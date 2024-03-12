import { Account, Prisma } from "@prisma/client";

export interface AccountRepository {
  create: (account: Prisma.AccountCreateInput) => Promise<Account>;
  findByEmail: (email: string) => Promise<Account | null>;
}
