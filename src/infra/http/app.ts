import fastify from "fastify";
import fastifyCors from "@fastify/cors";

import { accountRoutes } from "./controllers/accounts/routes";

export const app = fastify();

app.register(fastifyCors, {
  origin: true,
  credentials: true,
});

app.register(accountRoutes);
