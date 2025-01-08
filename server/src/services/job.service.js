import Job from "../models/job.model.js";
import { ApiError, ApiResponse } from "../utils/index.js";

export class JobService {
  static async create(req) {
    const jobDetail = req.body;

    const newJob = await Job.create(jobDetail);

    return new ApiResponse({ newJob }, 201, "Job created successfully");
  }
  static async find(req) {
    const { id } = req.params;

    const isJobExist = await Job.findById(id);

    if (!isJobExist) {
      throw new ApiError(404, "Job not found");
    }

    return new ApiResponse({ job: isJobExist }, 200, "Job find successfully");
  }

  static async update(req) {
    const { id } = req.params;
    const updatedJobDetail = req.body;

    const job = await Job.findById(id);
    if (!job) {
      throw new ApiError(404, "Job not found");
    }

    const updatedJob = await Job.findByIdAndUpdate(id, updatedJobDetail, {
      new: true,
    });

    return new ApiResponse({ updatedJob }, 200, "Job updated successfully");
  }

  static async delete(req) {
    const { id } = req.params;
    const job = await Job.findById(id);
    if (!job) {
      throw new ApiError(404, "Job not found");
    }
    const deletedJob = await Job.findOneAndDelete(id);
    return new ApiResponse({ deletedJob }, 200, "Job deleted successfully");
  }

  static async getAll(req) {
    const jobs = await Job.find({}).sort({ createdAt: -1 }); // Sort by createdAt in descending order
    return new ApiResponse({ jobs }, 200, "Jobs fetched successfully");
  }
}
