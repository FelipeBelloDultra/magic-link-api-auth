import { Account, Prisma } from "@prisma/client";

import { prisma } from "~/infra/database/connection";
import { AccountRepository } from "../account-repository";

export class PrismaAccountRepository implements AccountRepository {
  public async create({
    email,
    icon_url,
    name,
  }: Prisma.AccountCreateInput): Promise<Account> {
    return await prisma.account.create({
      data: {
        email,
        icon_url,
        name,
      },
    });
  }

  public async findByEmail(email: string): Promise<Account | null> {
    return await prisma.account.findUnique({
      where: { email },
    });
  }
}
