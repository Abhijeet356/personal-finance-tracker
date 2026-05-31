import { Router } from "express";

import {
  createRecurringRule,
  deleteRecurringRule,
  getRecurringRules,
  updateRecurringRule,
} from "../controllers/recurringRule.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import {
  createRecurringRuleSchema,
  updateRecurringRuleSchema,
} from "../validators/recurringRule.validator.js";

const router = Router();

router.use(protect);

router
  .route("/")
  .post(validate(createRecurringRuleSchema), createRecurringRule)
  .get(getRecurringRules);

router
  .route("/:id")
  .put(validate(updateRecurringRuleSchema), updateRecurringRule)
  .delete(deleteRecurringRule);

export default router;
