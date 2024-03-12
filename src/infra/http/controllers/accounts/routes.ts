import { FastifyInstance } from "fastify";

import { create } from "./create";

export async function accountRoutes(app: FastifyInstance) {
  app.post("/account", create);
}
