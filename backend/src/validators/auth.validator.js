import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.email("Please provide a valid email").toLowerCase(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const loginSchema = z.object({
  email: z.email("Please provide a valid email").toLowerCase(),
  password: z.string().min(1, "Password is required"),
});

