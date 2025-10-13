import { Request, Response } from "express";
import { asyncHandler } from "../../utils/async-handler";
import { ApiResponse } from "../../utils/api-response";
import { getreviewSchema } from "../../validators/admin/review.validators";
import { deleteReviewService, getAllReviewsService } from "../../services/admin/review.services";

export const getAllReviews = asyncHandler(async (req: Request, res: Response) => {
  const filters = getreviewSchema.parse(req.query);
  const result = await getAllReviewsService(filters);
  return res.status(200).json(new ApiResponse(200, result, "Reviews fetched successfully"));
});

export const deleteReview = asyncHandler(async (req: Request, res: Response) => {
  const { reviewId } = req.params;
  await deleteReviewService(reviewId);
  return res.status(200).json(new ApiResponse(200, null, "Review deleted successfully"));
});
