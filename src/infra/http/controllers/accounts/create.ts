import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";

import { makeCreateAccount } from "~/application/use-cases/factories/make-create-account";
import { EmailAlreadyUsedError } from "~/application/use-cases/errors/email-alreay-used-error";

import { env } from "~/config";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createAccountBodySchema = z.object({
    name: z.string().max(200),
    email: z.string().email(),
    icon_url: z.string().default(env.AVATAR_PLACEHOLDER_URL),
  });
  const { email, icon_url, name } = createAccountBodySchema.parse(request.body);

  try {
    const createAccount = makeCreateAccount();
    await createAccount.execute({ email, icon_url, name });
  } catch (error) {
    if (error instanceof EmailAlreadyUsedError) {
      return reply.status(409).send({
        message: error.message,
      });
    }

    throw error;
  }

  return reply.status(201).send();
}
