import { AccountTokens, Prisma } from "@prisma/client";

export interface AccountTokenRepository {
  findByToken: (token: string) => Promise<AccountTokens | null>;
  create: (
    accountToken: Prisma.AccountTokensCreateInput
  ) => Promise<AccountTokens>;
}
