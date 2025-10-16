import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMyReviews, createReview, updateReview, deleteReview } from "@/lib/api/user/review.api";
import type { CreateReview, ReviewResponse, UpdateReview } from "@/types/user/review.types";
import type { ApiResponse } from "@/types/common/api.types";
import { useAuthUser } from "./useUser";
import toast from "react-hot-toast";
import { getErrorMessage } from "@/lib/getErrorMessage";

export const useGetMyReviews = () => {
  const user = useAuthUser();
  return useQuery<ApiResponse<ReviewResponse[]>, unknown>({
    queryKey: ["reviews", user?._id],
    queryFn: () => getMyReviews(),
    staleTime: Infinity,
  });
};

export const useCreateReview = () => {
  const queryClient = useQueryClient();
  const user = useAuthUser();
  return useMutation<ApiResponse<ReviewResponse>, unknown, { productId: string; data: CreateReview }>({
    mutationFn: ({ productId, data }) => createReview(productId, data),
    onSuccess: (response) => {
      toast.success(response.message || "Review created successfully");
      queryClient.invalidateQueries({ queryKey: ["reviews", user?._id] });
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
    onError: (err: any) => {
      toast.error(getErrorMessage(err) || "Failed to create review");
    },
  });
};

export const useUpdateReview = () => {
  const queryClient = useQueryClient();
  const user = useAuthUser();
  return useMutation<ApiResponse<ReviewResponse>, unknown, { reviewId: string; data: UpdateReview }>({
    mutationFn: ({ reviewId, data }) => updateReview(reviewId, data),
    onSuccess: (response) => {
      toast.success(response.message || "Review updated successfully");
      queryClient.invalidateQueries({ queryKey: ["reviews", user?._id] });
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
    onError: (err: any) => {
      toast.error(getErrorMessage(err) || "Failed to update review");
    },
  });
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<null>, unknown, string>({
    mutationFn: (reviewId) => deleteReview(reviewId),
    onSuccess: (response) => {
      toast.success(response.message || "Review deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
    onError: (err: any) => {
      toast.error(getErrorMessage(err) || "Failed to delete review");
    },
  });
};
