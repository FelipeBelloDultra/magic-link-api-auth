import { FastifyInstance } from "fastify";

import { create } from "./create";
import { authenticate } from "./authenticate";
import { verifyToken } from "./verify-token";

export async function accountRoutes(app: FastifyInstance) {
  app.post("/account", create);
  app.post("/account/auth", authenticate);
  app.post("/account/verify/:token", verifyToken);
}
