import { z } from "zod";

const ENVIRONMENT_SCHEMA = z.object({
  HTTP_SERVER_PORT: z.coerce.number().default(3000),

  DATABASE_URL: z.string(),

  REDIS_PORT: z.coerce.number().default(6379),
  REDIS_HOST: z.string(),
  REDIS_PASSWORD: z.string(),

  AVATAR_PLACEHOLDER_URL: z.string(),

  MAIL_HOST: z.string(),
  MAIL_PORT: z.coerce.number(),
  MAIL_USERNAME: z.string(),
  MAIL_PASSWORD: z.string(),
  MAIL_FROM_ADDRESS: z.string().email(),
  MAIL_DRIVER: z.enum(["mail", "local"]).default("local"),

  APP_DOMAIN: z.string(),

  JWT_SECRET: z.string(),
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
