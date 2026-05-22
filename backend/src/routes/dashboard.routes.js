import { Router } from "express";

import {
  getCategoryBreakdown,
  getMonthly,
  getSummary,
} from "../controllers/dashboard.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.use(protect);

router.get("/summary", getSummary);
router.get("/monthly", getMonthly);
router.get("/category-breakdown", getCategoryBreakdown);

export default router;

