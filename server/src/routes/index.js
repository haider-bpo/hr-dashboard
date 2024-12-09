import { Router } from "express";

import jobRouter from "./jobs.routes.js";
import ApplicantRouter from "./applicant.routes.js";

const router = Router();

router.use("/job", jobRouter);
router.use("/applicant", ApplicantRouter);

export default router;
