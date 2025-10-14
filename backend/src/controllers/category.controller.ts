import { asyncHandler } from "../utils/async-handler";
import { Request, Response } from "express";
import { getAllCategoriesService } from "../services/category.services";
import { ApiResponse } from "../utils/api-response";

export const getAllCategories = asyncHandler(async (req: Request, res: Response) => {
  const categories = await getAllCategoriesService();
  return res.status(200).json(new ApiResponse(200, categories, "Categories fetched successfully"));
});