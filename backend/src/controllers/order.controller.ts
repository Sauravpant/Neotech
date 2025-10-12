import { Request, Response } from "express";
import { createOrderService, handleStripeWebhookService } from "../services/order.services";
import { AuthenticatedRequest } from "../types/auth.types";
import { orderSchema } from "../validators/order.validators";
import { ApiResponse } from "../utils/api-response";
import { asyncHandler } from "../utils/async-handler";
import { stripe } from "../configs/stripe";

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET; //Stripe webhook secret

export const createOrder = async (req: AuthenticatedRequest, res: Response) => {
  const { products, shippingAddress, paymentMethod } = req.body;
  const data = orderSchema.parse({ paymentMethod, shippingAddress });
  const result = await createOrderService({
    userId: req.user._id.toString(),
    products,
    shippingAddress: data.shippingAddress,
    paymentMethod: data.paymentMethod,
  });
  return res.status(201).json(new ApiResponse(201, result, "Order created successfully"));
};

export const stripeWebhook = asyncHandler(async (req: Request, res: Response) => {
  let event: any;
  if (endpointSecret) {
    const signature = req.headers["stripe-signature"];
    if (!signature) {
      return res.status(400).send("Missing Stripe signature");
    }
    try {
      event = stripe.webhooks.constructEvent(req.body, signature, endpointSecret);
    } catch (err: any) {
      console.log(`Webhook signature verification failed.`, err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
  }
  await handleStripeWebhookService(event);
  res.json({ received: true });
});
