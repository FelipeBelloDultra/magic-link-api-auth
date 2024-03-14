import { container } from "tsyringe";

import { SendWelcomeMail } from "../send-welcome-mail";

export function makeSendWelcomeMail() {
  return container.resolve(SendWelcomeMail);
}
