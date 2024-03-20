import { inject, injectable } from "tsyringe";

import { AccountTokenRepository } from "../repository/account-token-repository";

import { InvalidTokenError } from "./errors/invalid-token-error";
import { TokenExpiredError } from "./errors/token-expired-error";

interface VerifyTokenRequest {
  token: string;
}

@injectable()
export class VerifyToken {
  constructor(
    @inject("AccountTokenRepository")
    private readonly accountTokenRepository: AccountTokenRepository
  ) {}

  public async execute({ token }: VerifyTokenRequest) {
    const accountToken = await this.accountTokenRepository.findByToken(token);
    if (!accountToken || !accountToken.is_valid) {
      throw new InvalidTokenError();
    }

    const CURRENT_DATE = new Date();
    if (CURRENT_DATE.getTime() > accountToken.expires_at.getTime()) {
      throw new TokenExpiredError();
    }

    await this.accountTokenRepository.invalidateOneByToken(accountToken.token);

    return {
      accountId: accountToken.account_id,
      accountEmail: accountToken.email,
    };
  }
}
