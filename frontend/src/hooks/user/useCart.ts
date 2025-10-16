import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMyCart, addToCart, incrementQuantity, decrementQuantity, removeFromCart, clearCart } from "@/lib/api/user/cart.api";
import type { ApiResponse } from "@/types/common/api.types";
import type { CartResponse } from "@/types/user/cart.types";
import toast from "react-hot-toast";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { useAuthUser } from "./useUser";

export const useGetMyCart = () => {
  const user = useAuthUser();
  return useQuery<ApiResponse<CartResponse>, unknown>({
    queryKey: ["cart", user?._id],
    queryFn: () => getMyCart(),
    staleTime: Infinity,
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  const user = useAuthUser();
  return useMutation<ApiResponse<CartResponse>, unknown, string>({
    mutationFn: (productId: string) => addToCart(productId),
    onSuccess: (response) => {
      toast.success(response.message || "Product added to cart");
      queryClient.invalidateQueries({ queryKey: ["cart", user?._id] });
    },
    onError: (err: any) => {
      toast.error(getErrorMessage(err) || "Failed to add to cart");
    },
  });
};

export const useIncrementQuantity = () => {
  const queryClient = useQueryClient();
  const user = useAuthUser();
  return useMutation<ApiResponse<CartResponse>, unknown, string>({
    mutationFn: (productId: string) => incrementQuantity(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", user?._id] });
    },
    onError: (err: any) => {
      toast.error(getErrorMessage(err) || "Failed to increment quantity");
    },
  });
};

export const useDecrementQuantity = () => {
  const queryClient = useQueryClient();
  const user = useAuthUser();
  return useMutation<ApiResponse<CartResponse>, unknown, string>({
    mutationFn: (productId: string) => decrementQuantity(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", user?._id] });
    },
    onError: (err: any) => {
      toast.error(getErrorMessage(err) || "Failed to decrement quantity");
    },
  });
};

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();
  const user = useAuthUser();
  return useMutation<ApiResponse<CartResponse>, unknown, string>({
    mutationFn: (productId: string) => removeFromCart(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", user?._id] });
    },
    onError: (err: any) => {
      toast.error(getErrorMessage(err) || "Failed to remove from cart");
    },
  });
};

export const useClearCart = () => {
  const queryClient = useQueryClient();
  const user = useAuthUser();
  return useMutation({
    mutationFn: () => clearCart(),
    onSuccess: (response) => {
      toast.success(response.message || "Cart cleared successfully");
      queryClient.invalidateQueries({ queryKey: ["cart", user?._id] });
    },
    onError: (err: any) => {
      toast.error(getErrorMessage(err) || "Failed to clear cart");
    },
  });
};
