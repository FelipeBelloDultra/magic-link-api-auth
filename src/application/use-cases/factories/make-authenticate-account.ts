import { PrismaAccountRepository } from "~/application/repository/prisma/prisma-account-repository";
import { PrismaAccountTokenRepository } from "~/application/repository/prisma/prisma-account-token-repository";

import { AuthenticateAccount } from "../authenticate-account";
import { BullQueueProvider } from "~/infra/providers/queue/implementations/bullmq-queue-provider";
import { QUEUE_NAME } from "~/infra/queue/send-authentication-link";

export function makeAuthenticateAccount() {
  const accountRepository = new PrismaAccountRepository();
  const accountTokenRepository = new PrismaAccountTokenRepository();
  const authenticateMailQueueProvider = new BullQueueProvider(QUEUE_NAME);

  const authenticateAccount = new AuthenticateAccount(
    accountRepository,
    accountTokenRepository,
    authenticateMailQueueProvider
  );

  return authenticateAccount;
}
