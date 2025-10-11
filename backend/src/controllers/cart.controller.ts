import { Request, Response, Router } from "express";
import { asyncHandler } from "../utils/async-handler";
import { AuthenticatedRequest } from "../types/auth.types";
import { ApiResponse } from "../utils/api-response";
import {
  addToCartService,
  incrementQuantityService,
  decrementQuantityService,
  removeFromCartService,
  clearCartService,
  getMyCartService,
} from "../services/cart.services";

export const addToCart = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { productId } = req.params;
  const cart = await addToCartService(productId, req.user._id.toString());
  return res.status(200).json(new ApiResponse(200, cart, "Product added to cart"));
});

export const incrementQuantity = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { productId } = req.params;
  const cart = await incrementQuantityService(req.user._id.toString(), productId);
  return res.status(200).json(new ApiResponse(200, cart, "Product quantity incremented"));
});

export const decrementQuantity = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { productId } = req.params;
  const cart = await decrementQuantityService(req.user._id.toString(), productId);
  return res.status(200).json(new ApiResponse(200, cart, "Product quantity decremented"));
});

export const removeFromCart = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { productId } = req.params;
  const cart = await removeFromCartService(productId, req.user._id.toString());
  return res.status(200).json(new ApiResponse(200, cart, "Product removed from cart"));
});

export const clearCart = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  await clearCartService(req.user._id.toString());
  return res.status(200).json(new ApiResponse(200, null, "Cart cleared successfully"));
});

export const getMyCart = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const cart = await getMyCartService(req.user._id.toString());
  return res.status(200).json(new ApiResponse(200, cart, "Cart fetched successfully"));
});
