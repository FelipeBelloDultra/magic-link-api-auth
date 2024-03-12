import { app } from "~/infra/http/app";

import { env } from "~/config";

app
  .listen({
    host: "0.0.0.0",
    port: env.HTTP_SERVER_PORT,
  })
  .then(() => {
    console.log(`[🚀]: listening on port ${env.HTTP_SERVER_PORT}`);
  });
