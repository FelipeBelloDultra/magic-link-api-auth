import { makeSendAuthenticationLinkMail } from "~/application/use-cases/factories/make-send-authentication-link-mail";

import { BullQueueProvider } from "~/infra/providers/queue/implementations/bullmq-queue-provider";

export const QUEUE_NAME = "send-authentication-link-mail-queue";

const authenticationLinkMailQueueProvider = new BullQueueProvider(QUEUE_NAME);
const sendAuthenticationLinkMail = makeSendAuthenticationLinkMail();

authenticationLinkMailQueueProvider.process<{
  email: string;
  name: string;
  expiresInMinutes: number;
  token: string;
}>(async ({ data }) => {
  const { name, email, expiresInMinutes, token } = data;

  await sendAuthenticationLinkMail.execute({
    name,
    email,
    expiresInMinutes,
    token,
  });
});
