import useJobsStore, { JobsStore } from "./jobStore";

// Selector functions
export const useJobs = () => useJobsStore((store: JobsStore) => store.jobs);
export const useAddJob = () => useJobsStore((store: JobsStore) => store.addJob);
export const useUpdateJob = () =>
  useJobsStore((store: JobsStore) => store.updateJob);
export const useDeleteJob = () =>
  useJobsStore((store: JobsStore) => store.deleteJob);
export const useGetJobs = () =>
  useJobsStore((store: JobsStore) => store.getJobs);
