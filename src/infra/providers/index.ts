import { Lifecycle, container } from "tsyringe";

import "./queue/queues";

import { NodemailerMailProvider } from "./mail/implementations/nodemailer-mail-provider";
import { MailProvider } from "./mail/mail-provider";

import { RedisCacheProvider } from "./cache/implementations/ioredis-cache-provider";
import { CacheProvider } from "./cache/cache-provider";

container.register<MailProvider>("MailProvider", NodemailerMailProvider, {
  lifecycle: Lifecycle.Singleton,
});

container.register<CacheProvider>("CacheProvider", RedisCacheProvider, {
  lifecycle: Lifecycle.Singleton,
});
