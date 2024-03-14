import { container } from "tsyringe";

import { VerifyToken } from "../verify-token";

export function makeVerifyToken() {
  return container.resolve(VerifyToken);
}
