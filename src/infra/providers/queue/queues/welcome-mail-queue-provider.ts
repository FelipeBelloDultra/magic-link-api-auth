import { BullQueueProvider } from "../implementations/bullmq-queue-provider";

export class WelcomeMailQueueProvider extends BullQueueProvider {
  constructor() {
    super("welcome-mail-queue");
  }
}
