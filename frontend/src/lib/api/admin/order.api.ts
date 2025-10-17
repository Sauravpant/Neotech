import { api } from "@/lib/utils/axiosInstance";
import type { ApiResponse } from "@/types/common/api.types";
import type { GetAllOrders, Order, OrdersData, UpdateOrder } from "@/types/admin/order.types";

export const getAllOrders = async (params?: GetAllOrders): Promise<ApiResponse<OrdersData>> => {
  const response = await api.get<ApiResponse<OrdersData>>("/admin/order/get-all-orders", {
    params,
  });
  return response.data;
};

export const updateOrderStatus = async (orderId: string, data: UpdateOrder): Promise<ApiResponse<Order>> => {
  const response = await api.patch<ApiResponse<Order>>(`/admin/order/update-order/${orderId}`, data);
  return response.data;
};

export const deleteOrder = async (orderId: string): Promise<ApiResponse<null>> => {
  const response = await api.delete<ApiResponse<null>>(`/admin/order/delete-order/${orderId}`);
  return response.data;
};
