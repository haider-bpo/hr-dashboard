import { toast } from "@/hooks/use-toast";
import { createJob, deleteJob, getJobs, updateJob } from "./jobApi";
import { Job } from "./jobTypes"; // Import Job interface
import { create, StateCreator } from "zustand";

export interface JobsStore {
  jobs: Job[];
  getJobs: () => Promise<void>;
  addJob: (job: Job) => Promise<void>;
  updateJob: (jobId: string, updatedJob: Partial<Job>) => Promise<void>;
  deleteJob: (jobId: string) => Promise<void>;
}

const jobsStore: StateCreator<JobsStore> = (set) => ({
  jobs: [],

  getJobs: async () => {
    const res = await getJobs();

    if (res?.data) {
      const { jobs } = res.data;

      set(() => ({
        jobs: jobs,
      }));

      toast({
        title: "Jobs Retrieved Successfully",
        description: "View the retrieved jobs",
        variant: "success",
      });
    }
  },

  addJob: async (job) => {
    const res = await createJob(job);

    if (res?.data) {
      const { newJob } = res.data as { newJob: Job };
      set((state) => ({
        jobs: [newJob, ...state.jobs],
      }));

      toast({
        title: "Job Created Successfully",
        description: "View the new job",
        variant: "success",
      });
    }
  },

  updateJob: async (jobId, updatedJob) => {
    const res = await updateJob(jobId, updatedJob);

    if (res.data) {
      const { updatedJob: updated } = res.data as { updatedJob: Job };
      set((state) => ({
        jobs: state.jobs.map((job) => (job._id === jobId ? updated : job)),
      }));

      toast({
        title: "Job Updated Successfully",
        description: "View the updated job",
        variant: "success",
      });
    }
  },

  deleteJob: async (jobId) => {
    const res = await deleteJob(jobId);

    if (res.data) {
      set((state) => ({
        jobs: state.jobs.filter((job) => job._id !== jobId),
      }));

      toast({
        title: "Job Deleted Successfully",
        description: "View the updated job list",
        variant: "success",
      });
    }
  },
});

const useJobStore = create<JobsStore>(jobsStore);

export default useJobStore;
