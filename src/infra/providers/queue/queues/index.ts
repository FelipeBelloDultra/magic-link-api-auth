import { container } from "tsyringe";

import { QueueProvider } from "../queue-provider";
import { AuthenticateMailQueueProvider } from "./authenticate-mail-queue-provider";
import { WelcomeMailQueueProvider } from "./welcome-mail-queue-provider";

container.register<QueueProvider>(
  "AuthenticateMailQueueProvider",
  AuthenticateMailQueueProvider
);

container.register<QueueProvider>(
  "WelcomeMailQueueProvider",
  WelcomeMailQueueProvider
);
