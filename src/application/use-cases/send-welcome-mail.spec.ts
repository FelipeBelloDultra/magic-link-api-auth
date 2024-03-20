import { vi, describe, it, expect, beforeEach } from "vitest";

import { FakeMailProvider } from "~/infra/providers/mail/fakes/fake-mail-provider";
import { SendWelcomeMail } from "./send-welcome-mail";

let fakeMailProvider: FakeMailProvider;
let sut: SendWelcomeMail;

describe("SendWelcomeMail", () => {
  beforeEach(() => {
    fakeMailProvider = new FakeMailProvider();
    sut = new SendWelcomeMail(fakeMailProvider);
  });

  it("should send welcome email", () => {
    const spyMailProvider_sendWelcomeMail = vi.spyOn(
      fakeMailProvider,
      "sendWelcomeMail"
    );

    const EMAIL = "email@example.com";
    const NAME = "example";

    sut.execute({
      email: EMAIL,
      name: NAME,
    });

    expect(spyMailProvider_sendWelcomeMail).toHaveBeenCalledWith({
      name: NAME,
      email: EMAIL,
    });
  });
});
