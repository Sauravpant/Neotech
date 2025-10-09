import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().min(5, "Name is too short").max(50, "Name is too long").optional(),
  contactNumber: z
    .string()
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .optional(),
  address: z.string().min(5, "Enter the detailed address").max(200, "Too long address").optional(),
});
