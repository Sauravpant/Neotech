import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrder, getMyOrders, getOrderById, cancelOrder } from "@/lib/api/user/order.api";
import type { CreateOrderInput, OrderByIdResponse, OrderResponse } from "@/types/user/order.types";
import type { ApiResponse } from "@/types/common/api.types";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { useAuthUser } from "./useUser";

export const useGetMyOrders = () => {
  const user = useAuthUser();
  return useQuery<ApiResponse<OrderResponse[]>, unknown>({
    queryKey: ["orders", user?._id],
    queryFn: () => getMyOrders(),
    enabled: !!user?._id,
    staleTime: Infinity,
  });
};

export const useGetOrderById = (orderId: string) => {
  const user = useAuthUser();
  return useQuery<ApiResponse<OrderByIdResponse>, unknown>({
    queryKey: ["order", orderId, user?._id],
    queryFn: () => getOrderById(orderId),
    enabled: !!orderId && !!user?._id,
    staleTime: Infinity,
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  const user = useAuthUser();
  const navigate = useNavigate();
  return useMutation<ApiResponse<string | null>, unknown, CreateOrderInput>({
    mutationFn: (data: CreateOrderInput) => createOrder(data),
    onSuccess: (response) => {
      toast.success(response.message || "Order created successfully!");
      if (response.data) {
        window.location.href = response.data;
      } else {
        navigate("/order/success");
      }
      queryClient.invalidateQueries({ queryKey: ["orders", user?._id] });
      queryClient.invalidateQueries({ queryKey: ["cart", user?._id] });
    },
    onError: (err: any) => {
      toast.error(getErrorMessage(err) || "Failed to create order");
      navigate("/order/failure");
    },
  });
};

export const useCancelOrder = () => {
  const queryClient = useQueryClient();
  const user = useAuthUser();
  return useMutation<ApiResponse<null>, unknown, string>({
    mutationFn: (orderId: string) => cancelOrder(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders", user?._id] });
    },
    onError: (error) => {
      console.error("Cancel order failed:", error);
    },
  });
};
