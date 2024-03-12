import { AccountRepository } from "../repository/account-repository";

interface CreateAccountRequest {
  name: string;
  email: string;
  icon_url: string;
}

export class CreateAccount {
  constructor(private readonly accountRepository: AccountRepository) {}

  public async execute({
    email,
    icon_url,
    name,
  }: CreateAccountRequest): Promise<void> {
    const account = await this.accountRepository.findByEmail(email);

    if (account) {
      throw new Error("Account already exists");
    }

    await this.accountRepository.create({
      email,
      icon_url,
      name,
    });
  }
}
