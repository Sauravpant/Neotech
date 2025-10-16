import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMyWishlist, addToWishlist, removeFromWishlist, clearWishlist } from "@/lib/api/user/wishlist.api";
import { useAuthUser } from "./useUser";
import type { WishlistResponse } from "@/types/user/wishlist.types";
import type { ApiResponse } from "@/types/common/api.types";

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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist", user?._id] });
    },
    onError: (error) => {
      console.error("Add to wishlist failed:", error);
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
    onError: (error) => {
      console.error("Remove from wishlist failed:", error);
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
    onError: (error) => {
      console.error("Clear wishlist failed:", error);
    },
  });
};
