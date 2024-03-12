import { Queue, Processor, Worker } from "bullmq";

import { QueueProvider } from "../queue-provider";
import { env } from "~/config";

export class BullQueueProvider implements QueueProvider {
  private readonly queue: Queue;
  private readonly queueName: string;
  private readonly REDIS_CONNECTION_OPTIONS = {
    port: env.REDIS_PORT,
    host: env.REDIS_HOST,
    password: env.REDIS_PASSWORD,
  };

  constructor(queueName: string) {
    this.queueName = queueName;
    this.queue = new Queue(this.queueName, {
      connection: this.REDIS_CONNECTION_OPTIONS,
      defaultJobOptions: {
        removeOnComplete: true,
        attempts: 2,
      },
    });
  }

  public async addJob<JobDataType>(jobData: JobDataType) {
    await this.queue.add("message", jobData, {
      delay: 3000, // 3 seconds to add job to queue
    });
  }

  public process<ProcessDataType>(processFunction: Processor<ProcessDataType>) {
    new Worker(this.queueName, processFunction, {
      connection: this.REDIS_CONNECTION_OPTIONS,
      limiter: {
        // 1 job per 2 minutes will be processed
        max: 1,
        duration: 2000,
      },
    })
      .on("completed", (job) => {
        // [TODO]: Implement logic to when job is completed
      })
      .on("active", (job) => {
        // [TODO]: Implement logic to when job is active
      })
      .on("failed", (job) => {
        // [TODO]: Implement logic to when job failed
      });
  }
}
