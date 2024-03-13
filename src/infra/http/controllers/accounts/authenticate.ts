import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";

import { makeAuthenticateAccount } from "~/application/use-cases/factories/make-authenticate-account";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateAccountBodySchema = z.object({
    email: z.string().email(),
  });
  const { email } = authenticateAccountBodySchema.parse(request.body);

  const authenticateAccount = makeAuthenticateAccount();
  await authenticateAccount.execute({ email });

  return reply.status(200).send();
}
