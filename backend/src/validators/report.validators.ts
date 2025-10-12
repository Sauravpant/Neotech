import z from "zod";

export const reportProductSchema = z.object({
  reason: z.string().min(1, "Reason is required").max(100, "Reason can be at most 100 characters long"),
  description: z.string().min(1, "Description is required").max(500, "Description can be at most 500 characters long"),
});
