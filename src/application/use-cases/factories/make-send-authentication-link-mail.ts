import { NodemailerMailProvider } from "~/infra/providers/mail/implementations/nodemailer-mail-provider";

import { SendAuthenticationLinkMail } from "../send-authentication-link-mail";

export function makeSendAuthenticationLinkMail() {
  const nodemailerMailProvider = new NodemailerMailProvider();
  const sendAuthenticationLinkMail = new SendAuthenticationLinkMail(
    nodemailerMailProvider
  );

  return sendAuthenticationLinkMail;
}
