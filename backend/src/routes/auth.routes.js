import { Router } from "express";

import { protect } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import {
  loginSchema,
  onboardingSchema,
  profileSchema,
  signupSchema,
} from "../validators/auth.validator.js";

import {
  completeOnboarding,
  getMe,
  login,
  signup,
  updateProfile,
  deleteAccount,
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/signup", validate(signupSchema), signup);
router.post("/login", validate(loginSchema), login);
router.get("/me", protect, getMe);
router.post("/onboarding", protect, validate(onboardingSchema), completeOnboarding);
router.patch("/profile", protect, validate(profileSchema), updateProfile);
router.delete("/account", protect, deleteAccount);

export default router;
