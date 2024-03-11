import { z } from "zod";

const ENVIRONMENT_SCHEMA = z.object({
  HTTP_SERVER_PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string(),
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
