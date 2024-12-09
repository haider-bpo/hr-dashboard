import { Router } from "express";
import {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
} from "../controllers/job.controller.js";
import validateRequest from "../middlewares/validateRequest.middleware.js";
import { jobValidationSchema } from "../validations/jobValidation.js";

const router = Router();

router.get("/", getAllJobs);
router.post("/create", validateRequest(jobValidationSchema), createJob);
router.put("/:id", validateRequest(jobValidationSchema), updateJob);
router.delete("/:id", deleteJob);

export default router;
