import { Router } from "express";

import {
  completeOnboarding,
  getMe,
  login,
  signup,
  updateProfile,
} from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import {
  loginSchema,
  onboardingSchema,
  profileSchema,
  signupSchema,
} from "../validators/auth.validator.js";

const router = Router();

router.post("/signup", validate(signupSchema), signup);
router.post("/login", validate(loginSchema), login);
router.get("/me", protect, getMe);
router.post("/onboarding", protect, validate(onboardingSchema), completeOnboarding);
router.patch("/profile", protect, validate(profileSchema), updateProfile);

export default router;
