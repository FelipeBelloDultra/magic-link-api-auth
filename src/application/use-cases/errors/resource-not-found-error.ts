export class ResourceNotFound extends Error {
  constructor() {
    super("Resource not found");
    this.name = ResourceNotFound.name;
  }
}
