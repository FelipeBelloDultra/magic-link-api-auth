import { vi, describe, it, expect, beforeEach } from "vitest";

import { FakeQueueProvider } from "~/infra/providers/queue/fakes/fake-queue-provider";
import { InMemoryAccountRepository } from "../repository/in-memory/in-memory-account-repository";
import { CreateAccount } from "./create-account";

import { EmailAlreadyUsedError } from "./errors/email-alreay-used-error";

import { env } from "~/config";

let accountRepository: InMemoryAccountRepository;
let welcomeMailQueueProvider: FakeQueueProvider;
let sut: CreateAccount;

describe("CreateAccount", () => {
  beforeEach(() => {
    accountRepository = new InMemoryAccountRepository();
    welcomeMailQueueProvider = new FakeQueueProvider();
    sut = new CreateAccount(accountRepository, welcomeMailQueueProvider);
  });

  it("should create a new account", async () => {
    const NAME = "example";
    const EMAIL = "email@example.com";
    const spyWelcomMailQueueProvider = vi.spyOn(
      welcomeMailQueueProvider,
      "addJob"
    );

    await expect(
      sut.execute({
        email: EMAIL,
        icon_url: env.AVATAR_PLACEHOLDER_URL,
        name: NAME,
      })
    ).resolves.not.toThrow();
    expect(spyWelcomMailQueueProvider).toHaveBeenCalledWith({
      name: NAME,
      email: EMAIL,
    });
  });

  it("should not be able to create a new account if email already exists", async () => {
    const EMAIL = "email@example.com";
    await accountRepository.create({
      email: EMAIL,
      icon_url: env.AVATAR_PLACEHOLDER_URL,
      name: "example",
    });

    await expect(
      sut.execute({
        email: EMAIL,
        icon_url: env.AVATAR_PLACEHOLDER_URL,
        name: "example",
      })
    ).rejects.toBeInstanceOf(EmailAlreadyUsedError);
  });
});
