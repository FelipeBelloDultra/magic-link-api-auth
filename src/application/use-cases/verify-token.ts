import { inject, injectable } from "tsyringe";
import jsonwebtoken from "jsonwebtoken";

import { AccountTokenRepository } from "../repository/account-token-repository";

import { InvalidTokenError } from "./errors/invalid-token-error";
import { TokenExpiredError } from "./errors/token-expired-error";

import { env } from "~/config";

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

    const jwt = jsonwebtoken.sign(
      {
        email: accountToken.email,
        id: accountToken.id,
      },
      env.JWT_SECRET,
      {
        expiresIn: 60 * 60 * 3, // 3 hours
      }
    );

    await this.accountTokenRepository.invalidateOneByToken(accountToken.token);

    return {
      authenticated_token: jwt,
    };
  }
}
