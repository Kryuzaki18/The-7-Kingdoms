import { z } from "zod";
import { EMAIL_REGEX } from "../constants/regex.constant";

export const registerSchema = z.object({
  email: z.string().regex(EMAIL_REGEX, "Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
