import { z } from "zod";

const ENVIRONMENT_SCHEMA = z.object({
  HTTP_SERVER_PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string(),
  REDIS_PORT: z.coerce.number().default(6379),
  REDIS_HOST: z.string(),
  REDIS_PASSWORD: z.string(),
  AVATAR_PLACEHOLDER_URL: z.string(),
});

const parsedEnv = ENVIRONMENT_SCHEMA.safeParse(process.env);

if (!parsedEnv.success) {
  throw new Error(
    `Invalid env var: ${JSON.stringify(
      parsedEnv.error.formErrors.fieldErrors,
      undefined,
      2
    )}`,
    {
      cause: "Invalid env config",
    }
  );
}

export const env = parsedEnv.data;
