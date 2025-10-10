import { Review } from "../models/review.models";
import { AppError } from "../utils/app-error";
import { CreateReview, ReviewResponse, UpdateReview } from "../types/review.types";
import { User } from "../models/user.models";
import { IUser } from "../types/user.types";
import { Product } from "../models/product.models";
import { IProduct } from "../types/product.types";

export const createReviewService = async (userId: string, productId: string, data: CreateReview): Promise<ReviewResponse> => {
  const user = await User.findById(userId).lean();
  if (!user) {
    throw new AppError(404, "User not found");
  }
  const product = await Product.findById(productId).select("_id name");
  if (!product) {
    throw new AppError(404, "Product doesnt exist");
  }
  const reviewExists = await Review.findOne({ user: userId, product: productId }).select("_id");
  if (reviewExists) {
    throw new AppError(401, "You have already reviewed this product");
  }
  const review = await Review.create({
    user: userId,
    product: productId,
    rating: data.rating,
    comment: data.comment || null,
  });

  return {
    _id: review._id.toString(),
    user: {
      _id: user._id.toString(),
      name: user.name,
      imageUrl: user.imageUrl || null,
    },
    product: product.name,
    rating: review.rating,
    comment: review.comment || null,
    createdAt: review.createdAt,
    updatedAt: review.updatedAt,
  };
};

export const updateReviewService = async (userId: string, reviewId: string, data: UpdateReview): Promise<ReviewResponse> => {
  const review = await Review.findOne({ _id: reviewId, user: userId })
    .populate<{ product: IProduct }>("product","name")
    .populate<{ user: IUser }>("user", "_id name imageUrl");
  if (!review) {
    throw new AppError(404, "Review not found");
  }
  if (data.rating !== undefined) review.rating = data.rating;
  if (data.comment !== undefined) review.comment = data.comment;

  await review.save();
  return {
    _id: review._id.toString(),
    user: {
      _id: review.user._id.toString(),
      name: review.user.name,
      imageUrl: review.user.imageUrl || null,
    },
    product: review.product.name,
    rating: review.rating,
    comment: review.comment || null,
    createdAt: review.createdAt,
    updatedAt: review.updatedAt,
  };
};

export const deleteReviewService = async (userId: string, reviewId: string): Promise<void> => {
  const review = await Review.findOneAndDelete({ _id: reviewId, user: userId });
  if (!review) throw new AppError(404, "Review not found");
};

export const getMyReviewsService = async (userId: string): Promise<ReviewResponse[]> => {
  const reviews = await Review.find({
    user: userId,
  })
    .populate<{ user: IUser }>("user", "name imageUrl")
    .populate<{ product: IProduct }>("product", "name")
    .lean();
  return reviews.map((r) => {
    const user = r.user;
    const product = r.product;
    return {
      _id: r._id.toString(),
      user: {
        _id: user._id.toString(),
        name: user.name,
        imageUrl: user.imageUrl || null,
      },
      product: product.name,
      rating: r.rating,
      comment: r.comment || null,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
    };
  });
};
