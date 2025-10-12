import { Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import { AuthenticatedRequest } from "../types/auth.types";
import { ApiResponse } from "../utils/api-response";
import { addToWishlistService, removeFromWishlistService, getMyWishlistService, clearWishlistService } from "../services/wishlist.services";

export const addToWishlist = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { productId } = req.params;
  const wishlist = await addToWishlistService(req.user._id.toString(), productId);
  return res.status(200).json(new ApiResponse(200, wishlist, "Product added to wishlist"));
});

export const removeFromWishlist = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { productId } = req.params;
  const wishlist = await removeFromWishlistService(req.user._id.toString(), productId);
  return res.status(200).json(new ApiResponse(200, wishlist, "Product removed from wishlist"));
});

export const getMyWishlist = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const wishlist = await getMyWishlistService(req.user._id.toString());
  return res.status(200).json(new ApiResponse(200, wishlist, "Wishlist fetched successfully"));
});

export const clearWishlist = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  await clearWishlistService(req.user._id.toString());
  return res.status(200).json(new ApiResponse(200, null, "Wishlist cleared successfully"));
});
