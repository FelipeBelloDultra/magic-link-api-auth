import { inject, injectable } from "tsyringe";

import { AccountRepository } from "../repository/account-repository";

import { ResourceNotFound } from "./errors/resource-not-found-error";

interface ShowAuthenticatedProfileRequest {
  id: string;
  email: string;
}

@injectable()
export class ShowAuthenticatedProfile {
  constructor(
    @inject("AccountRepository")
    private readonly accountRepository: AccountRepository
  ) {}

  public async execute({ email, id }: ShowAuthenticatedProfileRequest) {
    const account = await this.accountRepository.findByEmail(email);
    if (!account || account.id !== id) {
      throw new ResourceNotFound();
    }

    return account;
  }
}
