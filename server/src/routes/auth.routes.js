import { Router } from "express";
import {
  signupUser,
  signinUser,
  logoutUser,
  getUserDetail,
  refreshUserToken,
} from "../controllers/auth.controller.js";
import validateRequest from "../middlewares/validateRequest.middleware.js";
import { authenticate } from "../middlewares/authenticate.middleware.js";
import {
  signinValidationSchema,
  signupValidationSchema,
} from "../validations/userValidation.js";

const router = Router();

router.post("/signup", validateRequest(signupValidationSchema), signupUser);
router.post("/signin", validateRequest(signinValidationSchema), signinUser);
router.post("/refresh-token", refreshUserToken);
router.post("/logout", authenticate, logoutUser);
router.get("/me", authenticate, getUserDetail);

export default router;
