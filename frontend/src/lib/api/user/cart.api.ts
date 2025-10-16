import { api } from "@/lib/utils/axiosInstance";
import type { ApiResponse } from "@/types/common/api.types";
import type { CartResponse } from "@/types/user/cart.types";


export const getMyCart = async (): Promise<ApiResponse<CartResponse>> => {
  const response = await api.get<ApiResponse<CartResponse>>("/cart/get-cart");
  return response.data;
};

export const addToCart = async (productId: string): Promise<ApiResponse<CartResponse>> => {
  const response = await api.post<ApiResponse<CartResponse>>(`/cart/add-to-cart/${productId}`);
  return response.data;
};

export const incrementQuantity = async (productId: string): Promise<ApiResponse<CartResponse>> => {
  const response = await api.patch<ApiResponse<CartResponse>>(`/cart/increment-quantity/${productId}`);
  return response.data;
};

export const decrementQuantity = async (productId: string): Promise<ApiResponse<CartResponse>> => {
  const response = await api.patch<ApiResponse<CartResponse>>(`/cart/decrement-quantity/${productId}`);
  return response.data;
};

export const removeFromCart = async (productId: string): Promise<ApiResponse<CartResponse>> => {
  const response = await api.patch<ApiResponse<CartResponse>>(`/cart/remove-item/${productId}`);
  return response.data;
};

export const clearCart = async (): Promise<ApiResponse<void>> => {
  const response = await api.delete<ApiResponse<void>>("/cart/clear-cart");
  return response.data;
};
