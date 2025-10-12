import { z } from "zod";

export const getProductParams = z.object({
  id: z.string().min(1),
});

export const productParams = z.object({
  category: z.string().optional(),
  name: z.string().optional(),
  minPrice: z.preprocess((val) => (val === undefined ? undefined : Number(val)), z.number().nonnegative().optional()),
  maxPrice: z.preprocess((val) => (val === undefined ? undefined : Number(val)), z.number().nonnegative().optional()),
  sortBy: z.enum(["latest", "oldest", "priceAsc", "priceDesc"]).optional(),
  page: z.coerce.number().nonnegative().optional(),
  limit: z.coerce.number().nonnegative().optional(),
});
