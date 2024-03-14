import { container } from "tsyringe";

import { makeSendWelcomeMail } from "~/application/use-cases/factories/make-send-welcome-mail";
import { WelcomeMailQueueProvider } from "../providers/queue/queues/welcome-mail-queue-provider";

const welcomeMailQueueProvider = container.resolve(WelcomeMailQueueProvider);
const sendWelcomeMail = makeSendWelcomeMail();

welcomeMailQueueProvider.process<{ name: string; email: string }>(
  async ({ data }) => {
    const { name, email } = data;

    await sendWelcomeMail.execute({ name, email });
  }
);
