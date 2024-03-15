import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import { ZodError } from "zod";

import { accountRoutes } from "./controllers/accounts/routes";

import { env } from "~/config";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});
app.register(fastifyCors, {
  origin: true,
  credentials: true,
});
app.register(accountRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Validation error.",
      errors: error.format(),
    });
  }

  console.log(error);

  return reply.status(500).send({
    message: "Internal server error.",
  });
});
