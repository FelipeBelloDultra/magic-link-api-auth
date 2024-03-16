import { vi, describe, it, expect, beforeEach } from "vitest";

import { FakeMailProvider } from "~/infra/providers/mail/fakes/fake-mail-provider";
import { SendAuthenticationLinkMail } from "./send-authentication-link-mail";

let fakeMailProvider: FakeMailProvider;
let sut: SendAuthenticationLinkMail;

describe("SendAuthenticationLinkMail", () => {
  beforeEach(() => {
    fakeMailProvider = new FakeMailProvider();
    sut = new SendAuthenticationLinkMail(fakeMailProvider);
  });

  it("should send authentication mail with magic link", () => {
    const spyMailProvider_sendAuthenticationLinkMail = vi.spyOn(
      fakeMailProvider,
      "sendAuthenticationLinkMail"
    );

    sut.execute({
      email: "email@example.com",
      name: "example",
      expiresInMinutes: 10,
      token: "fake-token",
    });

    expect(spyMailProvider_sendAuthenticationLinkMail).toHaveBeenCalled();
  });
});
