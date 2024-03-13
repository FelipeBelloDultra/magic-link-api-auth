import { FastifyInstance } from "fastify";

import { create } from "./create";
import { authenticate } from "./authenticate";

export async function accountRoutes(app: FastifyInstance) {
  app.post("/account", create);
  app.post("/account/auth", authenticate);
}
