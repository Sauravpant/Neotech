import z from "zod";

export const addCategorySchema = z.object({
  name: z.string().min(2, "Category name should be at least 2 characters long").max(50, "Category name should be at most 50 characters long"),
  slug: z
    .string()
    .min(2, "Category slug should be at least 2 characters long")
    .max(50, "Category slug should be at most 50 characters long")
    .lowercase(),
  description: z
    .string()
    .min(10, "Category description should be at least 10 characters long")
    .max(200, "Category description should be at most 200 characters long"),
});

export const updateCategorySchema = z.object({
  name: z
    .string()
    .min(2, "Category name should be at least 2 characters long")
    .max(50, "Category name should be at most 50 characters long")
    .optional(),
  slug: z
    .string()
    .min(2, "Category slug should be at least 2 characters long")
    .max(50, "Category slug should be at most 50 characters long")
    .lowercase()
    .optional(),
  description: z
    .string()
    .min(10, "Category description should be at least 10 characters long")
    .max(200, "Category description should be at most 200 characters long")
    .optional(),
});

export const getCategoriesParamsSchema = z.object({
  page: z.coerce.number().min(1, "Page number should be at least 1").optional(),
  limit: z.coerce.number().min(1, "Limit should be at least 1").optional(),
  search: z.string().max(50, "Search term should be at most 50 characters long").optional(),
});
