import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteReview, getAllReviews } from "@/lib/api/admin/review.api";
import type { GetReviews, ReviewsResponse } from "@/types/admin/review.types";
import type { ApiResponse } from "@/types/common/api.types";
import toast from "react-hot-toast";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { useAuthUser } from "../user/useUser";

export const useGetAllReviews = (params?: GetReviews) => {
  const user = useAuthUser();
  return useQuery<ApiResponse<ReviewsResponse>, unknown>({
    queryKey: ["admin", "reviews", params],
    queryFn: () => getAllReviews(params),
    staleTime: 5 * 60 * 1000,
    enabled: !!user && user.role === "admin",
  });
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<null>, unknown, string>({
    mutationFn: (reviewId) => deleteReview(reviewId),
    onSuccess: (response) => {
      toast.success(response.message || "Review deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["admin", "reviews"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "stats"] });
    },
    onError: (err: any) => {
      toast.error(getErrorMessage(err) || "Failed to delete review");
    },
  });
};
