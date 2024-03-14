import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";

import { makeVerifyToken } from "~/application/use-cases/factories/make-verify-token";

export async function verifyToken(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const verifyTokenBodySchema = z.object({
    token: z.string().uuid(),
  });
  const { token } = verifyTokenBodySchema.parse(request.params);

  const verifyToken = makeVerifyToken();
  const { authenticated_token } = await verifyToken.execute({ token });

  return reply.status(200).send({
    authenticated_token,
  });
}
