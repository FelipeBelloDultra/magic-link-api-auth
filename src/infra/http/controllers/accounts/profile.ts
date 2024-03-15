import { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFound } from "~/application/use-cases/errors/resource-not-found-error";

import { makeShowAuthenticatedProfile } from "~/application/use-cases/factories/make-show-authenticated-profile";

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const showAuthenticatedProfile = makeShowAuthenticatedProfile();
  try {
    const authenticatedProfile = await showAuthenticatedProfile.execute({
      email: request.user.email,
      id: request.user.sub,
    });

    return reply.status(200).send({
      account: authenticatedProfile,
    });
  } catch (error) {
    if (error instanceof ResourceNotFound) {
      return reply.status(404).send({
        message: error.message,
      });
    }

    throw error;
  }
}
