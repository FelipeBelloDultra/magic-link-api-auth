import { BullQueueProvider } from "../implementations/bullmq-queue-provider";

export class AuthenticateMailQueueProvider extends BullQueueProvider {
  constructor() {
    super("send-authentication-link-mail-queue");
  }
}
