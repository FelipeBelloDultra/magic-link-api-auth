import { PrismaAccountRepository } from "~/application/repository/prisma/prisma-account-repository";

import { AuthenticateAccount } from "../authenticate-account";
import { BullQueueProvider } from "~/infra/providers/queue/implementations/bullmq-queue-provider";
import { QUEUE_NAME } from "~/infra/queue/send-authentication-link";

export function makeAuthenticateAccount() {
  const accoutRepository = new PrismaAccountRepository();
  const authenticateMailQueueProvider = new BullQueueProvider(QUEUE_NAME);

  const authenticateAccount = new AuthenticateAccount(
    accoutRepository,
    authenticateMailQueueProvider
  );

  return authenticateAccount;
}
