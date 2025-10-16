import { api } from "@/lib/utils/axiosInstance";
import type { ApiResponse } from "@/types/common/api.types";
import type { WishlistResponse } from "@/types/user/wishlist.types";


export const getMyWishlist = async (): Promise<ApiResponse<WishlistResponse>> => {
  const response = await api.get<ApiResponse<WishlistResponse>>("/wishlist/get-wishlist");
  return response.data;
};

export const addToWishlist = async (productId: string): Promise<ApiResponse<WishlistResponse>> => {
  const response = await api.post<ApiResponse<WishlistResponse>>(`/wishlist/add-to-wishlist/${productId}`);
  return response.data;
};

export const removeFromWishlist = async (productId: string): Promise<ApiResponse<WishlistResponse>> => {
  const response = await api.patch<ApiResponse<WishlistResponse>>(`/wishlist/remove-from-wishlist/${productId}`);
  return response.data;
};

export const clearWishlist = async (): Promise<ApiResponse<null>> => {
  const response = await api.delete<ApiResponse<null>>("/wishlist/clear-wishlist");
  return response.data;
};
