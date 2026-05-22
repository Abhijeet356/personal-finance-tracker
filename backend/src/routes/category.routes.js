import { Router } from "express";

import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "../controllers/category.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import {
  createCategorySchema,
  updateCategorySchema,
} from "../validators/category.validator.js";

const router = Router();

router.use(protect);

router
  .route("/")
  .post(validate(createCategorySchema), createCategory)
  .get(getCategories);

router
  .route("/:id")
  .get(getCategory)
  .put(validate(updateCategorySchema), updateCategory)
  .delete(deleteCategory);

export default router;

