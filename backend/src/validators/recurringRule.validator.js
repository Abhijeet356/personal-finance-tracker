import { z } from "zod";

const recurringRuleBaseSchema = {
  title: z.string().trim().max(80).optional().default(""),
  type: z.enum(["income", "expense"]),
  amount: z.number().min(0.01, "Amount must be greater than 0"),
  category: z.string().trim().min(1, "Category is required").max(50),
  description: z.string().trim().max(200).optional().default(""),
  paymentMethod: z
    .enum(["cash", "card", "upi", "bank_transfer", "other"])
    .optional()
    .default("other"),
  frequency: z.enum(["monthly"]).optional().default("monthly"),
  nextRunDate: z.coerce.date(),
  isActive: z.boolean().optional().default(true),
};

export const createRecurringRuleSchema = z.object(recurringRuleBaseSchema);

export const updateRecurringRuleSchema = z
  .object(recurringRuleBaseSchema)
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
  });
