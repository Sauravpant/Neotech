import { Types } from "mongoose";
import { IProduct } from "../../types/product.types";
import { IUser } from "../../types/user.types";
import { AppError } from "../../utils/app-error";
import { GetReviews, ReviewsResponse, UserReviews } from "../../types/admin/review.types";
import { Review } from "../../models/review.models";

const validateObjectId = (id: string) => Types.ObjectId.isValid(id);

export const getAllReviewsService = async (filters: GetReviews): Promise<ReviewsResponse> => {
  const { page = 1, limit = 10, sortBy = "desc" } = filters;
  const skip = (page - 1) * limit;
  const reviews = await Review.find()
    .sort({ createdAt: sortBy === "asc" ? 1 : -1 })
    .populate<{ user: IUser }>("user", "name imageUrl")
    .populate<{ product: IProduct }>("product", "name")
    .skip(skip)
    .limit(limit);
  const total = await Review.countDocuments();
  const userReviews: UserReviews[] = reviews.map((review) => ({
    _id: review._id.toString(),
    reviewedBy: review.user?.name,
    reviewedProduct: review.product?.name,
    rating: review.rating,
    comment: review.comment,
  }));
  return {
    userReviews,
    page,
    limit,
    totalReviews: total,
    total: Math.ceil(total / limit),
  };
};

export const deleteReviewService = async (reviewId: string): Promise<void> => {
  if (!validateObjectId(reviewId)) {
    throw new AppError(400, "Invalid review ID");
  }
  await Review.findByIdAndDelete(reviewId);
};
