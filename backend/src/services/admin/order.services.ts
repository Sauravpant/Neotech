import { Cart } from "../../models/cart.models";
import { Order } from "../../models/order.models";
import { GetAllOrders, GetAllOrdersResponse, OrdersResponse, OrderStats, UpdateOrder } from "../../types/admin/order.types";
import { IUser } from "../../types/user.types";
import { AppError } from "../../utils/app-error";
import { Types } from "mongoose";

const validateObjectId = (id: string) => Types.ObjectId.isValid(id);

export const getAllOrdersService = async (filters: GetAllOrders): Promise<GetAllOrdersResponse> => {
  const { page = 1, limit = 10, status, paymentMethod, search, sortBy = "desc" } = filters;
  const skip = (page - 1) * limit;

  const query: any = {};
  if (status) {
    query.status = status;
  }
  if (paymentMethod) {
    query.paymentMethod = paymentMethod;
  }
  if (search) {
    query.shippingAddress = { $regex: search, $options: "i" };
  }
  const orders = await Order.find(query)
    .populate<{ user: IUser }>({ path: "user", select: "name email" })
    .populate({ path: "products.product", select: "name price imageUrl" })
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: sortBy === "asc" ? 1 : -1 })
    .lean();
  const total = await Order.countDocuments(query);

  const userOrders: OrdersResponse[] = orders.map((order) => ({
    _id: order._id.toString(),
    user: order.user.name,
    email: order.user.email,
    products: order.products,
    shippingAddress: order.shippingAddress,
    paymentMethod: order.paymentMethod,
    totalPrice: order.totalPrice,
    isPaid: order.isPaid,
    paidAt: order.paidAt || null,
    isDelivered: order.isDelivered,
    deliveredAt: order.deliveredAt || null,
    status: order.status,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
  }));

  return {
    orders: userOrders,
    limit,
    page,
    total,
  };
};

export const updateOrderStatusService = async (orderId: string, status: UpdateOrder): Promise<OrdersResponse> => {
  if (!validateObjectId(orderId)) {
    throw new AppError(400, "Invalid order ID");
  }
  const order = await Order.findById(orderId)
    .populate<{ user: IUser }>({
      path: "user",
      select: "name email",
    })
    .populate({ path: "products.product", select: "name price imageUrl" });
  if (!order) {
    throw new AppError(404, "Order not found");
  }
  // if (order.status === "Delivered") {
  //   throw new AppError(400, "Cannot update status of a delivered order");
  //
  order.status = status.status;
  if (status.status === "Delivered") {
    const userId = order.user._id.toString();
    await Cart.deleteOne({ user: userId });
    order.isDelivered = true;
    order.deliveredAt = new Date();
  }
  if (status.isPaid) {
    order.isPaid = status.isPaid === "true";
    if (status.isPaid === "true" && !order.paidAt) {
      order.paidAt = new Date();
    }
  }
  await order.save();
  return {
    _id: order._id.toString(),
    user: order.user.name,
    email: order.user.email,
    products: order.products,
    shippingAddress: order.shippingAddress,
    paymentMethod: order.paymentMethod,
    totalPrice: order.totalPrice,
    isPaid: order.isPaid,
    paidAt: order.paidAt || null,
    isDelivered: order.isDelivered,
    deliveredAt: order.deliveredAt || null,
    status: order.status,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
  };
};

export const deleteOrderService = async (orderId: string): Promise<void> => {
  if (!validateObjectId(orderId)) {
    throw new AppError(400, "Invalid order ID");
  }
  const order = await Order.findById(orderId);
  if (!order) {
    throw new AppError(404, "Order not found");
  }
  const user = order.user.toString();
  if (order.isPaid) {
    throw new AppError(400, "Cannot delete a paid order");
  }
  if (order.status === "Cancelled" || order.status === "Pending") {
    //Order can be deleted only if it is Cancelled or Pending
    await Order.findByIdAndDelete(orderId);
  } else {
    throw new AppError(400, `The order is already ${order.status}. Cannot delete`);
  }
};

export const getOrderStatsService = async (): Promise<OrderStats> => {
  const totalOrders = await Order.countDocuments();
  const totalSalesAgg = await Order.aggregate([{ $match: { isPaid: true } }, { $group: { _id: null, totalSales: { $sum: "$totalPrice" } } }]);
  const pendingSalesAgg = await Order.aggregate([{ $match: { isPaid: false } }, { $group: { _id: null, totalSales: { $sum: "$totalPrice" } } }]);
  const ordersByStatusAgg = await Order.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]);
  return {
    totalOrders,
    totalSales: totalSalesAgg[0]?.totalSales || 0,
    pendingSales: pendingSalesAgg[0]?.totalSales || 0,
    ordersByStatus: ordersByStatusAgg[0] || [],
  };
};
