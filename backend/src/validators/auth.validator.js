import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.email("Please provide a valid email").toLowerCase(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  monthlyBudget: z
    .number()
    .min(0, "Monthly budget cannot be negative")
    .optional(),
});

export const loginSchema = z.object({
  email: z.email("Please provide a valid email").toLowerCase(),
  password: z.string().min(1, "Password is required"),
});

export const onboardingSchema = z.object({
  currentBalance: z.number().min(0, "Current balance cannot be negative"),
  monthlySalary: z.number().min(0, "Monthly salary cannot be negative"),
  monthlyBudget: z
    .number()
    .min(0, "Monthly budget cannot be negative")
    .optional(),
});

export const profileSchema = onboardingSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  {
    message: "At least one profile field is required",
  }
);
