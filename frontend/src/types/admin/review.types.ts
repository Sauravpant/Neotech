export interface UserReviews {
  _id: string;
  reviewedBy: string;
  reviewedProduct: string;
  rating: number;
  comment: string;
}

export interface ReviewsResponse {
  userReviews: UserReviews[];
  page: number;
  limit: number;
  totalReviews: number;
  total: number;
}

export interface GetReviews {
  page?: number;
  limit?: number;
  sortBy?: "asc" | "desc";
}
