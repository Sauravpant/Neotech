import z from "zod";

export const orderSchema = z.object({
  paymentMethod: z.enum(["COD", "Stripe"]),
  shippingAddress: z.string().min(5, "Enter detailed address").max(100, "Address is too long"),
});
