export class TokenExpiredError extends Error {
  constructor() {
    super("This token is expired");
    this.name = TokenExpiredError.name;
  }
}
