import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteOrder, getAllOrders, updateOrderStatus } from "@/lib/api/admin/order.api";
import type { GetAllOrders, Order, OrdersData, UpdateOrder } from "@/types/admin/order.types";
import type { ApiResponse } from "@/types/common/api.types";
import toast from "react-hot-toast";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { useAuthUser } from "../user/useUser";

export const useGetAllOrders = (params?: GetAllOrders) => {
  const user = useAuthUser();
  return useQuery<ApiResponse<OrdersData>, unknown>({
    queryKey: ["admin", "orders", params],
    queryFn: () => getAllOrders(params),
    staleTime: 5 * 60 * 1000,
    enabled: !!user && user.role === "admin",
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<Order>, unknown, { orderId: string; data: UpdateOrder }>({
    mutationFn: ({ orderId, data }) => updateOrderStatus(orderId, data),
    onSuccess: (response) => {
      toast.success(response.message || "Order updated successfully");
      queryClient.invalidateQueries({ queryKey: ["admin", "orders"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "stats"] });
    },
    onError: (err: any) => {
      toast.error(getErrorMessage(err) || "Failed to update order");
    },
  });
};

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<null>, unknown, string>({
    mutationFn: (orderId) => deleteOrder(orderId),
    onSuccess: (response) => {
      toast.success(response.message || "Order deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["admin", "orders"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "stats"] });
    },
    onError: (err: any) => {
      toast.error(getErrorMessage(err) || "Failed to delete order");
    },
  });
};
