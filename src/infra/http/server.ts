import Fastify, { FastifyInstance } from "fastify";

const fastify = Fastify();

fastify.get("/", (request, reply) => {
  reply.send({ ok: true });
});

export const app = fastify;
