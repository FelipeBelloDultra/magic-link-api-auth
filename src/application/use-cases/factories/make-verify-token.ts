import { PrismaAccountTokenRepository } from "~/application/repository/prisma/prisma-account-token-repository";

import { VerifyToken } from "../verify-token";

export function makeVerifyToken() {
  const accountTokenRepository = new PrismaAccountTokenRepository();
  const verifyToken = new VerifyToken(accountTokenRepository);

  return verifyToken;
}
