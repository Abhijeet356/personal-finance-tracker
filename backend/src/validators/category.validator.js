import { z } from "zod";

const hexColorRegex = /^#[0-9A-Fa-f]{6}$/;

const categoryBaseSchema = {
  name: z.string().trim().min(1, "Category name is required").max(50),
  type: z.enum(["income", "expense"]),
  color: z
    .string()
    .trim()
    .regex(hexColorRegex, "Color must be a valid hex color")
    .optional()
    .default("#64748B"),
};

export const createCategorySchema = z.object(categoryBaseSchema);

export const updateCategorySchema = z
  .object(categoryBaseSchema)
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
  });

