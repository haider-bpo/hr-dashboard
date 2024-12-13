import api from "@/app/api";
import { Job } from "./jobTypes";

export const getJobs = async () => api.get("/job/");
export const createJob = async (newJob: Job) => api.post("/job/create", newJob);
export const updateJob = async (jobId: string, updatedJob: Partial<Job>) =>
  api.put(`job/${jobId}`, updatedJob);
export const deleteJob = async (jobId: string) => api.delete(`job/${jobId}`);
