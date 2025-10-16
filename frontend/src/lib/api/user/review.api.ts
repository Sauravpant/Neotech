import { api } from "@/lib/utils/axiosInstance";
import type { ApiResponse } from "@/types/common/api.types";
import type { CreateReview, UpdateReview, ReviewResponse } from "@/types/user/review.types";

export const getMyReviews = async (): Promise<ApiResponse<ReviewResponse[]>> => {
  const response = await api.get<ApiResponse<ReviewResponse[]>>("/review/get-my-reviews");
  return response.data;
};

export const createReview = async (productId: string, data: CreateReview): Promise<ApiResponse<ReviewResponse>> => {
  const response = await api.post<ApiResponse<ReviewResponse>>(`/review/create-review/${productId}`, data);
  return response.data;
};

export const updateReview = async (reviewId: string, data: UpdateReview): Promise<ApiResponse<ReviewResponse>> => {
  const response = await api.patch<ApiResponse<ReviewResponse>>(`/review/update-review/${reviewId}`, data);
  return response.data;
};

export const deleteReview = async (reviewId: string): Promise<ApiResponse<null>> => {
  const response = await api.delete<ApiResponse<null>>(`/review/delete-review/${reviewId}`);
  return response.data;
};
