import { asyncHandler } from "../utils/index.js";
import { JobService } from "../services/index.js";

export const createJob = asyncHandler(async (req, res) => {
  const result = await JobService.create(req);
  res.status(201).json(result);
});

export const updateJob = asyncHandler(async (req, res) => {
  const result = await JobService.update(req);
  res.status(200).json(result);
});

export const deleteJob = asyncHandler(async (req, res) => {
  const result = await JobService.delete(req);
  res.status(200).json(result);
});

export const getAllJobs = asyncHandler(async (req, res) => {
  const result = await JobService.getAll(req);
  res.status(200).json(result);
});
