import { QueueProvider } from "../queue-provider";

export class FakeQueueProvider implements QueueProvider {
  private readonly queue: Array<Function> = [];
  public async addJob<JobDataType = { data: unknown }>(
    jobData: JobDataType
  ): Promise<void> {
    for (const job of this.queue) {
      await job(jobData);
    }
  }

  public process<ProcessDataType>(
    processFunction: (job: { data: ProcessDataType }) => Promise<void>
  ): void {
    this.queue.push(processFunction);
  }
}
