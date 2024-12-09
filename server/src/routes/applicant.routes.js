import { Router } from "express";
import {
  createApplicant,
  deleteApplicant,
  getAllApplicants,
} from "../controllers/applicant.controller.js";
import validateRequest from "../middlewares/validateRequest.middleware.js";
import { applicantValidationSchema } from "../validations/applicantValidation.js";

const router = Router();

router.get("/", getAllApplicants);
router.post(
  "/create",
  validateRequest(applicantValidationSchema),
  createApplicant
);
router.delete("/:id", deleteApplicant);

export default router;
