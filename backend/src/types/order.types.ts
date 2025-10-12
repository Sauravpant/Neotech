import { Document, Types } from "mongoose";

export interface IOrderItem {
  product: Types.ObjectId;
  quantity: number;
}

export interface IOrder extends Document {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  products: IOrderItem[];
  shippingAddress: string;
  paymentMethod: string;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: Date;
  stripeIntentId?: string;
  isDelivered: boolean;
  deliveredAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
}

interface ProductInput {
  product: string;
  quantity: number;
}

export interface CreateOrderInput {
  userId: string;
  products: ProductInput[];
  shippingAddress: string;
  paymentMethod: "COD" | "Stripe";
}
export interface OrderResponse {
  _id: string;
  paymentMethod: string;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  totalPrice: number;
  shippingAddress: string;
  isPaid: boolean;
  paidAt: Date | null;
  isDelivered: boolean;
  deliveredAt: Date | null;
  createdAt: Date;
}
[];

export interface OrderByIdResponse {
  id: string;
  user: string;
  products: {
    product: {
      id: string;
      name: string;
      price: number;
      image: string;
    };
    quantity: number;
  }[];
  shippingAddress: string;
  paymentMethod: string;
  totalPrice: number;
  isPaid: boolean;
  paidAt: Date | null;
  isDelivered: boolean;
  deliveredAt?: Date;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  createdAt: Date;
  updatedAt: Date;
}
