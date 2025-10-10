import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import { createReviewService, updateReviewService, deleteReviewService, getMyReviewsService } from "../services/review.services";
import { ApiResponse } from "../utils/api-response";
import { AuthenticatedRequest } from "../types/auth.types";
import { createReviewSchema, updateReviewSchema } from "../validators/review.validators";

export const createReview = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { productId } = req.params;
  const data = createReviewSchema.parse(req.body);
  const review = await createReviewService(req.user._id.toString(), productId, data);
  return res.status(201).json(new ApiResponse(201, review, "Review created successfully"));
});

export const updateReview = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const data = updateReviewSchema.parse(req.body);
  const review = await updateReviewService(req.user._id.toString(), id, data);
  return res.status(200).json(new ApiResponse(200, review, "Review updated successfully"));
});

export const deleteReview = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
   const { id } = req.params;
  await deleteReviewService(req.user._id.toString(), id);
  return res.status(200).json(new ApiResponse(200, null, "Review deleted successfully"));
});

export const getMyReviews = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const reviews = await getMyReviewsService(req.user._id.toString());
  return res.status(200).json(new ApiResponse(200, reviews, "Reviews fetched successfully"));
});
