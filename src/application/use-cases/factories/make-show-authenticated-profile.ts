import { container } from "tsyringe";

import { ShowAuthenticatedProfile } from "../show-authenticated-profile";

export function makeShowAuthenticatedProfile() {
  return container.resolve(ShowAuthenticatedProfile);
}
