import { AccountTokens, Prisma } from "@prisma/client";

export interface AccountTokenRepository {
  findByToken: (token: string) => Promise<AccountTokens | null>;
  invalidateManyByEmail: (email: string) => Promise<void>;
  invalidateOneByToken: (token: string) => Promise<void>;
  create: (
    accountToken: Prisma.AccountTokensCreateInput
  ) => Promise<AccountTokens>;
}
