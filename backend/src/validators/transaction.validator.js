import { z } from "zod";

const transactionBaseSchema = {
  type: z.enum(["income", "expense"]),
  amount: z.number().positive("Amount must be greater than 0"),
  category: z.string().trim().min(1, "Category is required").max(50),
  description: z.string().trim().max(200).optional().default(""),
  date: z.coerce.date(),
  paymentMethod: z
    .enum(["cash", "card", "upi", "bank_transfer", "other"])
    .optional()
    .default("other"),
};

export const createTransactionSchema = z.object(transactionBaseSchema);

export const updateTransactionSchema = z
  .object(transactionBaseSchema)
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
  });

