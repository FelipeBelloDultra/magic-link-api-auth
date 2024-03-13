import { makeSendWelcomeMail } from "~/application/use-cases/factories/make-send-welcome-mail";

import { BullQueueProvider } from "~/infra/providers/queue/implementations/bullmq-queue-provider";

export const QUEUE_NAME = "welcome-mail-queue";

const welcomeMailQueueProvider = new BullQueueProvider(QUEUE_NAME);
const sendWelcomeMail = makeSendWelcomeMail();

welcomeMailQueueProvider.process<{ name: string; email: string }>(
  async ({ data }) => {
    const { name, email } = data;

    await sendWelcomeMail.execute({ name, email });
  }
);
