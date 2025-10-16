export interface CreateOrderInput {
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
