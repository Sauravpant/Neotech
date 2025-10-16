import { api } from "@/lib/utils/axiosInstance";
import type { ApiResponse } from "@/types/common/api.types";
import type { CreateOrderInput, OrderResponse, OrderByIdResponse } from "@/types/user/order.types";

export const createOrder = async (data: CreateOrderInput): Promise<ApiResponse<string | null>> => {
  const response = await api.post<ApiResponse<string | null>>("/order/checkout", data);
  return response.data;
};

export const getMyOrders = async (): Promise<ApiResponse<OrderResponse[]>> => {
  const response = await api.get<ApiResponse<OrderResponse[]>>("/order/my-orders");
  return response.data;
};

export const getOrderById = async (orderId: string): Promise<ApiResponse<OrderByIdResponse>> => {
  const response = await api.get<ApiResponse<OrderByIdResponse>>(`/order/get/${orderId}`);
  return response.data;
};

export const cancelOrder = async (orderId: string): Promise<ApiResponse<null>> => {
  const response = await api.patch<ApiResponse<null>>(`/order/cancel/${orderId}`);
  return response.data;
};
