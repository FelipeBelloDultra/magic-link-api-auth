export interface QueueProvider {
  addJob: <JobDataType>(jobData: JobDataType) => Promise<void>;
  process: <ProcessDataType>(
    processFunction: (job: { data: ProcessDataType }) => Promise<void>
  ) => void;
}
