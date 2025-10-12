import { Order } from "../models/order.models";
import { Product } from "../models/product.models";
import { stripe } from "../configs/stripe";
import { AppError } from "../utils/app-error";
import { CreateOrderInput, OrderByIdResponse, OrderResponse } from "../types/order.types";
import { Types } from "mongoose";
import { IUser } from "../types/user.types";

const environment = process.env.NODE_ENV;

const validateObjectId = (id: string) => Types.ObjectId.isValid(id);

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
