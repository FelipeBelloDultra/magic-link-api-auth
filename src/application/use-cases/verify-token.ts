import jsonwebtoken from "jsonwebtoken";

import { AccountRepository } from "../repository/account-repository";
import { AccountTokenRepository } from "../repository/account-token-repository";

import { InvalidTokenError } from "./errors/invalid-token-error";
import { TokenExpiredError } from "./errors/token-expired-error";

import { env } from "~/config";

interface VerifyTokenRequest {
  token: string;
}

export class VerifyToken {
  constructor(
    private readonly accountTokenRepository: AccountTokenRepository
  ) {}

  public async execute({ token }: VerifyTokenRequest) {
    const accountToken = await this.accountTokenRepository.findByToken(token);
    if (!accountToken || !accountToken.is_valid) {
      throw new InvalidTokenError();
    }

    const CURRENT_DATE = new Date();
    if (accountToken.expires_at.getTime() > CURRENT_DATE.getTime()) {
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

    return {
      token: jwt,
    };
  }
}
