import { NodemailerMailProvider } from "~/infra/providers/mail/implementations/nodemailer-mail-provider";

import { SendWelcomeMail } from "../send-welcome-mail";

export function makeSendWelcomeMail() {
  const nodemailerMailProvider = new NodemailerMailProvider();
  const sendWelcomeMail = new SendWelcomeMail(nodemailerMailProvider);

  return sendWelcomeMail;
}
