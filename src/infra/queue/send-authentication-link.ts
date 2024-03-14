import { container } from "tsyringe";

import { makeSendAuthenticationLinkMail } from "~/application/use-cases/factories/make-send-authentication-link-mail";
import { AuthenticateMailQueueProvider } from "../providers/queue/queues/authenticate-mail-queue-provider";

const authenticationLinkMailQueueProvider = container.resolve(
  AuthenticateMailQueueProvider
);
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
