import { count } from "console";
import z from "zod";

export const createProductSchema = z.object({
  name: z.string().min(5, "Name is required").max(100, "Name is too long"),
  description: z.string().min(20, "Description is required").max(500, "Description is too long"),
  price: z.coerce.number().min(0, "Price must be greater than or equal to 0"),
  countInStock: z.coerce.number().min(0, "Count in stock must be greater than or equal to 0"),
  category: z.string().min(1, "Category is required"),
  discount: z.coerce.number().min(0, "Discount must be greater than or equal to 0").optional(),
});

export const updateProductSchema = z.object({
  name: z.string().min(5, "Name is required").max(100, "Name is too long").optional(),
  description: z.string().min(20, "Description is required").max(500, "Description is too long").optional(),
  price: z.coerce.number().min(0, "Price must be greater than or equal to 0").optional(),
  countInStock: z.coerce.number().min(0, "Count in stock must be greater than or equal to 0").optional(),
  category: z.string().min(1, "Category is required").optional(),
  discount: z.coerce.number().min(0, "Discount must be greater than or equal to 0").optional(),
})