export interface ProductInfo {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
}

export interface OrderProduct {
  product: ProductInfo;
  quantity: number;
  _id: string;
}

export interface Order {
  _id: string;
  user: string;
  email: string;
  products: OrderProduct[];
  shippingAddress: string;
  paymentMethod: string;
  totalPrice: number;
  isPaid: boolean;
  paidAt: string | null;
  isDelivered: boolean;
  deliveredAt: string | null;
  status: "Pending" | "Delivered" | "Cancelled" | string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrdersData {
  orders: Order[];
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
  }[];
}

export interface GetAllOrders {
  page?: number;
  limit?: number;
  status?: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  paymentMethod?: "COD" | "Stripe";
  search?: string;
  sortBy?: "asc" | "desc";
}

export interface UpdateOrder {
  status?: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  isPaid?: "true" | "false";
}
