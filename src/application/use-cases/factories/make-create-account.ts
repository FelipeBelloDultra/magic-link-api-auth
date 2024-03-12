import { PrismaAccountRepository } from "~/application/repository/prisma/prisma-account-repository";

import { CreateAccount } from "../create-account";

export function makeCreateAccount() {
  const accoutRepository = new PrismaAccountRepository();
  const createAccount = new CreateAccount(accoutRepository);

  return createAccount;
}
