import useJobsStore, { JobsStore } from "./jobStore";

// Selector functions
export const useJobs = () => useJobsStore((store: JobsStore) => store.jobs);
export const useAddJob = () => useJobsStore((store: JobsStore) => store.addJob);
export const useUpdateJob = () =>
  useJobsStore((store: JobsStore) => store.updateJob);
export const useRemoveJob = () =>
  useJobsStore((store: JobsStore) => store.removeJob);
export const useGetJobs = () =>
  useJobsStore((store: JobsStore) => store.getJobs);
export const useGetJobById = () =>
  useJobsStore((store: JobsStore) => store.getJobById);
