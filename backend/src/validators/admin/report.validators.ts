import z from "zod";

export const getreportsSchema=z.object({
  page:z.coerce.number().min(1).optional(),
  limit:z.coerce.number().min(1).max(100).optional(),
  sortBy:z.enum(['asc','desc']).optional(),
})