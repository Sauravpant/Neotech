import { Order } from "../models/order.models";
import { Product } from "../models/product.models";
import { stripe } from "../configs/stripe";
import { AppError } from "../utils/app-error";
import { CreateOrderInput } from "../types/order.types";

const environment = process.env.NODE_ENV;

export const createOrderService = async ({ userId, products, shippingAddress, paymentMethod }: CreateOrderInput) => {
  const productIds = products.map((p) => p.product);

  const dbProducts = await Product.find({
    //Find all the products with the given id's
    _id: { $in: productIds },
  });

  // if (dbProducts.length !== products.length) {
  //   throw new AppError(404, "Some products not found");
  // }

  let totalPrice = 0;

  const orderProducts = products.map((p) => {
    const dbProduct = dbProducts.find((dp) => dp._id.toString() === p.product); //Map the product id from the cart received from the frontend and the products fetched from the database which is in dbProducts
    totalPrice += dbProduct.price * p.quantity;
    return {
      product: dbProduct._id,
      quantity: p.quantity,
    };
  });

  const order = await Order.create({
    user: userId,
    products: orderProducts,
    shippingAddress,
    paymentMethod,
    totalPrice,
    isPaid: paymentMethod === "COD" ? false : undefined,
  });

  //If the payment method is Cash on Delivery (COD) return back
  if (paymentMethod === "COD") {
    return null;
  }

  //If the payment method is card (Stripe) process further
  const line_items = dbProducts.map((dbProduct) => {
    const item = products.find((p) => p.product === dbProduct._id.toString())!;
    const discountedPrice = dbProduct.price - (dbProduct.discount / 100) * dbProduct.price;
    return {
      price_data: {
        currency: "usd",
        product_data: { name: dbProduct.name },
        unit_amount: Math.round(discountedPrice * 100),
      },
      quantity: item.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    mode: "payment",
    success_url: environment === "production" ? `${process.env.CORS_ORIGIN}/order-success` : "http://localhost:5173/success",
    cancel_url: environment === "production" ? `${process.env.CORS_ORIGIN}/order-cancel` : "http://localhost:5173/success",
    metadata: { orderId: order._id.toString() },
  });

  return {
    stripeUrl: session.url,
  };
};

export const handleStripeWebhookService = async (event: any) => {
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;
    const orderId = session.metadata.orderId;
    const order = await Order.findById(orderId);
    if (order && !order.isPaid) {
      order.isPaid = true;
      order.paidAt = new Date();
      order.stripeIntentId = session.payment_intent;
      await order.save();
    }
  }
};
