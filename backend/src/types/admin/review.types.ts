import z from "zod";
import { getreviewSchema } from "../../validators/admin/review.validators";
import { UserReport } from "./report.types";

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

export type GetReviews = z.infer<typeof getreviewSchema>;