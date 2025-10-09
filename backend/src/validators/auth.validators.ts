import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(5, "Name is too short").max(50, "Name is too long"),
  email: z.email({ pattern: z.regexes.email }),
  contactNumber: z.string().regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  password: z
    .string()
    .min(8, "Password must be atleast 8 digits")
    .max(50, "Password is too long")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,15}$/, "Password must include uppercase, lowercase, number, and special character"),
});

export const loginSchema = z.object({
  email: z.email({ pattern: z.regexes.email }),
  password: z
    .string()
    .min(8, "Password must be atleast 8 digits")
    .max(50, "Password is too long")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,15}$/, "Password must include uppercase, lowercase, number, and special character"),
});

export const changePasswordSchema = z.object({
  oldPassword: z
    .string()
    .min(8, "Password must be atleast 8 digits")
    .max(50, "Password is too long")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,15}$/, "Password must include uppercase, lowercase, number, and special character"),
  newPassword: z
    .string()
    .min(8, "Password must be atleast 8 digits")
    .max(50, "Password is too long")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,15}$/, "Password must include uppercase, lowercase, number, and special character"),
});

export const forgotPasswordSchema = z.object({
  email: z.email({ pattern: z.regexes.email }),
  newPassword: z
    .string()
    .min(8, "Password must be 8 digits")
    .max(15, "Paassword can be at most 15 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/,
      "Password must include uppercase, lowercase, number, and special character"
    ),
  confirmNewPassword: z
    .string()
    .min(8, "Password must be 8 digits")
    .max(15, "Paassword can be at most 15 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/,
      "Password must include uppercase, lowercase, number, and special character"
    ),
  otp: z.string().max(6, "OTP must be of 6 digits").min(6, "OTP must be of 6 digits"),
});

export const otpSchema = z.object({
  email: z.email({ pattern: z.regexes.email }),
});

export const verifyAccountSchema = z.object({
  otp: z.string().max(6, "OTP must be of 6 digits").min(6, "OTP must be of 6 digits"),
});
