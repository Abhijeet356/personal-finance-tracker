import { Router } from "express";

import {
  createTransaction,
  deleteTransaction,
  getTransaction,
  getTransactions,
  updateTransaction,
} from "../controllers/transaction.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import {
  createTransactionSchema,
  updateTransactionSchema,
} from "../validators/transaction.validator.js";

const router = Router();

router.use(protect);

router
  .route("/")
  .post(validate(createTransactionSchema), createTransaction)
  .get(getTransactions);

router
  .route("/:id")
  .get(getTransaction)
  .put(validate(updateTransactionSchema), updateTransaction)
  .delete(deleteTransaction);

export default router;

