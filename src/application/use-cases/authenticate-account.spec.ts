import { vi, describe, it, expect, beforeEach } from "vitest";

import { FakeQueueProvider } from "~/infra/providers/queue/fakes/fake-queue-provider";
import { InMemoryAccountRepository } from "../repository/in-memory/in-memory-account-repository";
import { InMemoryAccountTokenRepository } from "../repository/in-memory/in-memory-account-token-repository";
import { AuthenticateAccount } from "./authenticate-account";

import { env } from "~/config";

let authenticateMailQueueProvider: FakeQueueProvider;
let accountRepository: InMemoryAccountRepository;
let accountTokenRepository: InMemoryAccountTokenRepository;
let sut: AuthenticateAccount;

describe("AuthenticateAccount", () => {
  beforeEach(() => {
    authenticateMailQueueProvider = new FakeQueueProvider();
    accountRepository = new InMemoryAccountRepository();
    accountTokenRepository = new InMemoryAccountTokenRepository();
    sut = new AuthenticateAccount(
      accountRepository,
      accountTokenRepository,
      authenticateMailQueueProvider
    );
  });

  it("should authenticate an account", async () => {
    const spyAuthenticateMailQueueProvider_addJob = vi.spyOn(
      authenticateMailQueueProvider,
      "addJob"
    );
    const spyAccountTokenRepository_create = vi.spyOn(
      accountTokenRepository,
      "create"
    );
    const spyAccountTokenRepository_invalidateManyByEmail = vi.spyOn(
      accountTokenRepository,
      "invalidateManyByEmail"
    );
    const ACCOUNT = await accountRepository.create({
      email: "email@example.com",
      icon_url: env.AVATAR_PLACEHOLDER_URL,
      name: "example",
    });

    await expect(
      sut.execute({
        email: ACCOUNT.email,
      })
    ).resolves.not.toThrow();
    expect(spyAuthenticateMailQueueProvider_addJob).toHaveBeenCalled();
    expect(spyAccountTokenRepository_create).toHaveBeenCalled();
    expect(
      spyAccountTokenRepository_invalidateManyByEmail
    ).toHaveBeenLastCalledWith(ACCOUNT.email);
  });

  it("should not authenticate an account if the email does not exist", async () => {
    const spyAccountTokenRepository_create = vi.spyOn(
      accountTokenRepository,
      "create"
    );

    await expect(
      sut.execute({
        email: "invalid-email",
      })
    ).resolves.not.toThrow();
    expect(spyAccountTokenRepository_create).not.toHaveBeenCalled();
  });
});
