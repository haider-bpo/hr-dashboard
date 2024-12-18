import { Router } from "express";

import jobRouter from "./jobs.routes.js";
import ApplicantRouter from "./applicant.routes.js";
import authRouter from "./auth.routes.js";
import { authenticate } from "../middlewares/authenticate.middleware.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/job", authenticate, jobRouter);
router.use("/applicant", authenticate, ApplicantRouter);

export default router;
