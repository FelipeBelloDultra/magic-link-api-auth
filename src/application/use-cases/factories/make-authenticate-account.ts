import { container } from "tsyringe";

import { AuthenticateAccount } from "../authenticate-account";

export function makeAuthenticateAccount() {
  return container.resolve(AuthenticateAccount);
}
