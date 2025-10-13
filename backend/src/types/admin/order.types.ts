import z from "zod";
import { getOrdersSchema, updateOrderSchema } from "../../validators/admin/order.validators";
import { IOrderItem } from "../order.types";

export interface OrdersResponse {
  _id: string;
  user: string;
  email: string;
  products: IOrderItem[];
  shippingAddress: string;
  paymentMethod: string;
  totalPrice: number;
  isPaid: boolean;
  paidAt: Date;
  isDelivered: boolean;
  deliveredAt: Date;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  createdAt: Date;
  updatedAt: Date;
}

export interface GetAllOrdersResponse {
  orders: OrdersResponse[];
  limit: number;
  page: number;
  total: number;
}

export interface OrderStats {
  totalOrders: number;
  totalSales: number;
  pendingSales: number;
  ordersByStatus: {
    _id: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
    count: number;
  };
}
[];
export type GetAllOrders = z.infer<typeof getOrdersSchema>;
export type UpdateOrder = z.infer<typeof updateOrderSchema>;
