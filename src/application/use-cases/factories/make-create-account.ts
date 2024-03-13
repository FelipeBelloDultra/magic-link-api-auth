import { PrismaAccountRepository } from "~/application/repository/prisma/prisma-account-repository";

import { CreateAccount } from "../create-account";
import { BullQueueProvider } from "~/infra/providers/queue/implementations/bullmq-queue-provider";
import { QUEUE_NAME } from "~/infra/queue/welcome-mail-queue";

export function makeCreateAccount() {
  const accountRepository = new PrismaAccountRepository();
  const welcomeMailQueueProvider = new BullQueueProvider(QUEUE_NAME);

  const createAccount = new CreateAccount(
    accountRepository,
    welcomeMailQueueProvider
  );

  return createAccount;
}
