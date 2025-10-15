import { Order } from "../models/order.models";
import { stripe } from "../configs/stripe";
import { AppError } from "../utils/app-error";
import { CreateOrderInput, OrderByIdResponse, OrderResponse } from "../types/order.types";
import { Types } from "mongoose";
import { IUser } from "../types/user.types";
import { Cart } from "../models/cart.models";
import { Product } from "../models/product.models";

const environment = process.env.NODE_ENV;

const validateObjectId = (id: string) => Types.ObjectId.isValid(id);

export const createOrderService = async ({ userId, shippingAddress, paymentMethod }: CreateOrderInput): Promise<string | null> => {
  const cartProducts = await Cart.findOne({ user: userId }).lean();
  if (!cartProducts) {
    throw new AppError(400, "Cart is empty");
  }

  const productIds = cartProducts.items.map((item) => item.product);
  const dbProducts = await Product.find({ _id: { $in: productIds } }).select("_id name price discount");

  const products = cartProducts.items.map((item) => {
    const dbProduct = dbProducts.find((p) => p._id.toString() === item.product.toString());
    const discountedPrice = dbProduct.price - (dbProduct.discount / 100) * dbProduct.price;
    return {
      product: item.product.toString(),
      quantity: item.quantity,
      price: discountedPrice, // store discounted price
    };
  });

  let totalPrice = 0;
  for (const item of products) {
    totalPrice += item.price * item.quantity; // correct total calculation
  }

  const order = await Order.create({
    user: userId,
    products: products,
    shippingAddress,
    paymentMethod,
    totalPrice,
    isPaid: paymentMethod === "COD" ? false : undefined,
  });
  await Cart.deleteOne({ user: userId }); // Clear cart after order creation
  //If the payment method is Cash on Delivery (COD) return back
  if (paymentMethod === "COD") {
    return null;
  }

  //If the payment method is card (Stripe) process further
  const line_items = products.map((product) => {
    const item = dbProducts.find((p) => p._id.toString() === product.product);
    return {
      price_data: {
        currency: "usd",
        product_data: { name: item.name, images: [item.imageUrl] },
        unit_amount: Math.round(product.price * 100),
      },
      quantity: product.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    mode: "payment",
    success_url: environment === "production" ? `${process.env.CORS_ORIGIN}/order-success` : "http://localhost:5173/success",
    cancel_url: environment === "production" ? `${process.env.CORS_ORIGIN}/order-cancel` : "http://localhost:5173/cancel",
    metadata: { orderId: order._id.toString() },
  });

  return session.url || null;
};

export const handleStripeWebhookService = async (event: any): Promise<void> => {
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

export const cancelOrderService = async (userId: string, orderId: string): Promise<void> => {
  if (!validateObjectId(userId) || !validateObjectId(orderId)) {
    throw new AppError(400, "Invalid id");
  }
  const order = await Order.findOne({ _id: orderId, user: userId });
  if (!order) {
    throw new AppError(404, "Order doesnt exist");
  }
  if (order.status === "Pending" || order.status === "Processing") {
    order.status = "Cancelled";
    await order.save();
  } else {
    throw new AppError(400, `The order is already ${order.status}. Cannot cancel`);
  }
};

export const getMyOrdersService = async (userId: string): Promise<OrderResponse[]> => {
  const orders = await Order.find({ user: userId }).lean();
  const userOrders = orders.map((order) => ({
    _id: order._id.toString(),
    paymentMethod: order.paymentMethod,
    status: order.status,
    totalPrice: order.totalPrice,
    shippingAddress: order.shippingAddress,
    isPaid: order.isPaid,
    paidAt: order.paidAt ?? null,
    isDelivered: order.isDelivered,
    deliveredAt: order.deliveredAt ?? null,
    createdAt: order.createdAt,
  }));

  return userOrders;
};

export const getOrderByIdService = async (userId: string, orderId: string): Promise<OrderByIdResponse> => {
  if (!validateObjectId(userId) || !validateObjectId(orderId)) {
    throw new AppError(400, "Invalid ID");
  }
  const order = await Order.findOne({ _id: orderId, user: userId })
    .populate("products.product", "name price imageUrl")
    .populate<{ user: IUser }>("user", "name")
    .lean();

  if (!order) {
    throw new AppError(404, "Order not found");
  }

  const userOrder = {
    id: order._id.toString(),
    user: order.user.name,
    products: order.products.map((item: any) => ({
      product: {
        id: item.product?._id?.toString(),
        name: item.product?.name,
        price: item.product?.price,
        image: item.product?.imageUrl,
      },
      quantity: item.quantity,
    })),
    shippingAddress: order.shippingAddress,
    paymentMethod: order.paymentMethod,
    totalPrice: order.totalPrice,
    isPaid: order.isPaid,
    paidAt: order.paidAt ?? null,
    isDelivered: order.isDelivered,
    deliveredAt: order.deliveredAt ?? null,
    status: order.status,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
  };

  return userOrder;
};
