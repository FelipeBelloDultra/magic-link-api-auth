import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";

import { makeVerifyToken } from "~/application/use-cases/factories/make-verify-token";

import { InvalidTokenError } from "~/application/use-cases/errors/invalid-token-error";
import { TokenExpiredError } from "~/application/use-cases/errors/token-expired-error";

export async function verifyToken(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const verifyTokenBodySchema = z.object({
    token: z.string().uuid(),
  });
  const { token } = verifyTokenBodySchema.parse(request.params);

  try {
    const verifyToken = makeVerifyToken();
    const { authenticated_token } = await verifyToken.execute({ token });

    return reply.status(200).send({
      authenticated_token,
    });
  } catch (error) {
    if (error instanceof InvalidTokenError) {
      return reply.status(401).send({
        message: error.message,
      });
    }

    if (error instanceof TokenExpiredError) {
      return reply.status(403).send({
        message: error.message,
      });
    }

    throw error;
  }
}
