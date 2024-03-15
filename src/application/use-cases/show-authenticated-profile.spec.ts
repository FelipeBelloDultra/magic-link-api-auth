import { expect, it, describe, beforeEach } from "vitest";

import { InMemoryAccountRepository } from "../repository/in-memory/in-memory-account-repository";

import { ShowAuthenticatedProfile } from "./show-authenticated-profile";
import { ResourceNotFound } from "./errors/resource-not-found-error";

import { env } from "~/config";

let sut: ShowAuthenticatedProfile;
let accountRepository: InMemoryAccountRepository;

describe("ShowAuthenticatedProfile", () => {
  beforeEach(() => {
    accountRepository = new InMemoryAccountRepository();
    sut = new ShowAuthenticatedProfile(accountRepository);
  });

  it("should show the authenticated profile", async () => {
    const ACCOUNT = await accountRepository.create({
      email: "email@example.com",
      icon_url: env.AVATAR_PLACEHOLDER_URL,
      name: "example",
    });

    const result = await sut.execute({
      id: ACCOUNT.id,
      email: ACCOUNT.email,
    });

    expect(result).toStrictEqual(ACCOUNT);
  });

  it("should not show the authenticated profile if account does not exists", async () => {
    await expect(() => {
      return sut.execute({
        id: "invalid-id",
        email: "invalid-email",
      });
    }).rejects.toBeInstanceOf(ResourceNotFound);
  });

  it("should not show the authenticated profile if id is different from account email", async () => {
    const ACCOUNT = await accountRepository.create({
      email: "email@example.com",
      icon_url: env.AVATAR_PLACEHOLDER_URL,
      name: "example",
    });

    await expect(() => {
      return sut.execute({
        id: "invalid-id",
        email: ACCOUNT.email,
      });
    }).rejects.toBeInstanceOf(ResourceNotFound);
  });
});
