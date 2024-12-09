import { ApplicantService } from "../services/applicant.service.js";
import { asyncHandler } from "../utils/index.js";

export const createApplicant = asyncHandler(async (req, res) => {
  const result = await ApplicantService.create(req);
  res.status(201).json(result);
});
export const deleteApplicant = asyncHandler(async (req, res) => {
  const result = await ApplicantService.delete(req);
  res.status(200).json(result);
});
export const getAllApplicants = asyncHandler(async (req, res) => {
  const result = await ApplicantService.getAll(req);
  res.status(201).json(result);
});
