import { container } from "tsyringe";

import { CreateAccount } from "../create-account";

export function makeCreateAccount() {
  return container.resolve(CreateAccount);
}
