import "../providers";

import { container } from "tsyringe";

import { AccountRepository } from "~/application/repository/account-repository";
import { PrismaAccountRepository } from "~/infra/repository/prisma/prisma-account-repository";

import { AccountTokenRepository } from "~/application/repository/account-token-repository";
import { PrismaAccountTokenRepository } from "~/infra/repository/prisma/prisma-account-token-repository";

container.register<AccountRepository>(
  "AccountRepository",
  PrismaAccountRepository
);

container.register<AccountTokenRepository>(
  "AccountTokenRepository",
  PrismaAccountTokenRepository
);
