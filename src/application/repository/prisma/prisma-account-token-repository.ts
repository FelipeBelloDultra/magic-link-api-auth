import { Prisma, AccountTokens } from "@prisma/client";

import { prisma } from "~/infra/database/connection";
import { AccountTokenRepository } from "../account-token-repository";

export class PrismaAccountTokenRepository implements AccountTokenRepository {
  public async create(
    accountToken: Prisma.AccountTokensCreateInput
  ): Promise<AccountTokens> {
    return await prisma.accountTokens.create({
      data: accountToken,
    });
  }

  public async findByToken(token: string): Promise<AccountTokens | null> {
    return await prisma.accountTokens.findUnique({
      where: { token },
    });
  }
}
