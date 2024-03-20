import { expect, it, describe, beforeEach, vi } from "vitest";
import { randomUUID } from "node:crypto";

import { env } from "~/config";

import { InMemoryAccountRepository } from "../repository/in-memory/in-memory-account-repository";
import { InMemoryAccountTokenRepository } from "../repository/in-memory/in-memory-account-token-repository";
import { VerifyToken } from "./verify-token";

import { InvalidTokenError } from "./errors/invalid-token-error";
import { TokenExpiredError } from "./errors/token-expired-error";

let accountRepository: InMemoryAccountRepository;
let accountTokenRepository: InMemoryAccountTokenRepository;
let sut: VerifyToken;

describe("VerifyToken", () => {
  beforeEach(() => {
    accountRepository = new InMemoryAccountRepository();
    accountTokenRepository = new InMemoryAccountTokenRepository();
    sut = new VerifyToken(accountTokenRepository);
  });

  it("should verify token", async () => {
    const TOKEN = randomUUID();
    const ACCOUNT = await accountRepository.create({
      email: "email@example.com",
      icon_url: env.AVATAR_PLACEHOLDER_URL,
      name: "example",
    });
    await accountTokenRepository.create({
      account_id: ACCOUNT.id,
      email: ACCOUNT.email,
      token: TOKEN,
      expires_at: new Date(new Date().getTime() + 10000),
    });
    const spyAccountTokenRepository_findByToken = vi.spyOn(
      accountTokenRepository,
      "findByToken"
    );
    const spyAccountTokenRepository_invalidateOneByToken = vi.spyOn(
      accountTokenRepository,
      "invalidateOneByToken"
    );

    const result = await sut.execute({ token: TOKEN });

    expect(result.accountEmail).toBe(ACCOUNT.email);
    expect(result.accountId).toBe(ACCOUNT.id);
    expect(spyAccountTokenRepository_findByToken).toHaveBeenCalledWith(TOKEN);
    expect(spyAccountTokenRepository_invalidateOneByToken).toHaveBeenCalledWith(
      TOKEN
    );
  });

  it("should not verify token if token does not exist", async () => {
    await expect(sut.execute({ token: "FAKE-TOKEN" })).rejects.toBeInstanceOf(
      InvalidTokenError
    );
  });

  it("should not verify token if token was invalidated", async () => {
    const TOKEN = randomUUID();
    await accountTokenRepository.create({
      account_id: randomUUID(),
      email: "email@example.com",
      token: TOKEN,
      expires_at: new Date(new Date().getTime() + 10000),
    });
    await accountTokenRepository.invalidateOneByToken(TOKEN);

    await expect(sut.execute({ token: TOKEN })).rejects.toBeInstanceOf(
      InvalidTokenError
    );
  });

  it("should not be verify token if token is expired", async () => {
    const CURRENT_DATE = new Date();
    const TOKEN = randomUUID();

    await accountTokenRepository.create({
      account_id: randomUUID(),
      email: "email@example.com",
      token: TOKEN,
      expires_at: new Date(
        CURRENT_DATE.setMinutes(CURRENT_DATE.getMinutes() - 15)
      ),
    });

    await expect(sut.execute({ token: TOKEN })).rejects.toBeInstanceOf(
      TokenExpiredError
    );
  });
});
