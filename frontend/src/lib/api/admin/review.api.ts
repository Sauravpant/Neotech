import { api } from "@/lib/utils/axiosInstance";
import type { ApiResponse } from "@/types/common/api.types";
import type { GetReviews, ReviewsResponse } from "@/types/admin/review.types";

export const getAllReviews = async (params?: GetReviews): Promise<ApiResponse<ReviewsResponse>> => {
  const response = await api.get<ApiResponse<ReviewsResponse>>("/admin/review/get-all-reviews", {
    params,
  });
  return response.data;
};

export const deleteReview = async (reviewId: string): Promise<ApiResponse<null>> => {
  const response = await api.delete<ApiResponse<null>>(`/admin/review/delete-review/${reviewId}`);
  return response.data;
};

