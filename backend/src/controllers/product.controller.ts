import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import { productParams } from "../validators/product.validators";
import { getAllProductsService, getProductByIdService } from "../services/product.services";
import { ApiResponse } from "../utils/api-response";

export const getAllProducts = asyncHandler(async (req: Request, res: Response) => {
  const params = productParams.parse(req.params);
  const products = await getAllProductsService(params);
  return res.status(200).json(new ApiResponse(200, products, "Products fetched successfully"));
});
export const getProductById = asyncHandler(async (req: Request, res: Response) => {
  const { productId } = req.params;
  const result = await getProductByIdService(productId);
  return res.status(200).json(new ApiResponse(200, result, "Product fetched successfully"));
});
