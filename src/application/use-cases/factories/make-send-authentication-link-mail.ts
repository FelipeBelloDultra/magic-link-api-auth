import { container } from "tsyringe";

import { SendAuthenticationLinkMail } from "../send-authentication-link-mail";

export function makeSendAuthenticationLinkMail() {
  return container.resolve(SendAuthenticationLinkMail);
}
