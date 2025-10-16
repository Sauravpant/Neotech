import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMyWishlist, addToWishlist, removeFromWishlist, clearWishlist } from "@/lib/api/user/wishlist.api";
import { useAuthUser } from "./useUser";
import type { WishlistResponse } from "@/types/user/wishlist.types";
import type { ApiResponse } from "@/types/common/api.types";
import toast from "react-hot-toast";
import { getErrorMessage } from "@/lib/getErrorMessage";

export const useGetMyWishlist = () => {
  const user = useAuthUser();
  return useQuery<ApiResponse<WishlistResponse>, unknown>({
    queryKey: ["wishlist", user?._id],
    queryFn: () => getMyWishlist(),
    staleTime: Infinity,
  });
};

export const useAddToWishlist = () => {
  const queryClient = useQueryClient();
  const user = useAuthUser();
  return useMutation<ApiResponse<WishlistResponse>, unknown, string>({
    mutationFn: (productId: string) => addToWishlist(productId),
    onSuccess: (response) => {
      toast.success(response.message || "Product added to wishlist.");
      queryClient.invalidateQueries({ queryKey: ["wishlist", user?._id] });
    },
    onError: (err: any) => {
      toast.error(getErrorMessage(err) || "Failed to add product to wishlist.");
    },
  });
};

export const useRemoveFromWishlist = () => {
  const queryClient = useQueryClient();
  const user = useAuthUser();
  return useMutation<ApiResponse<WishlistResponse>, unknown, string>({
    mutationFn: (productId: string) => removeFromWishlist(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist", user?._id] });
    },
    onError: (err: any) => {
      toast.error(getErrorMessage(err) || "Failed to remove product from wishlist.");
    },
  });
};

export const useClearWishlist = () => {
  const queryClient = useQueryClient();
  const user = useAuthUser();
  return useMutation<ApiResponse<null>, unknown, void>({
    mutationFn: () => clearWishlist(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist", user?._id] });
    },
    onError: (err: any) => {
      toast.error(getErrorMessage(err) || "Failed to clear wishlist.");
    },
  });
};
