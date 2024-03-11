import { app } from "~/infra/http/server";

import { env } from "~/config/env";

app
  .listen({
    port: env.HTTP_SERVER_PORT,
  })
  .then(() => {
    console.log(`[🚀]: listening on port ${env.HTTP_SERVER_PORT}`);
  });
