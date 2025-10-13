import z from "zod";

export const getOrdersSchema = z.object({
  page: z.coerce.number().min(1).optional(),
  limit: z.coerce.number().min(1).max(100).optional(),
  status: z.enum(["Pending", "Processing", "Shipped", "Delivered", "Cancelled"]).optional(),
  search: z.string().optional(),
  paymentMethod: z.enum(["COD", "Stripe"]).optional(),
  sortBy: z.enum(["asc", "desc"]).optional(),
});

export const updateOrderSchema = z.object({
  status: z.enum(["Pending", "Processing", "Shipped", "Delivered", "Cancelled"], "Invalid status"),
  isPaid: z.enum(["true", "false"]).optional(),
});
