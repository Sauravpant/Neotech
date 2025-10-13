import { Response } from "express";
import { AuthenticatedRequest } from "../../types/auth.types";
import { asyncHandler } from "../../utils/async-handler";
import { addCategorySchema, getCategoriesParamsSchema, updateCategorySchema } from "../../validators/admin/category.validators";
import {
  addCategoryService,
  deleteCategoryService,
  getAllCategoriesService,
  getCategoryByIdService,
  updateCategoryService,
} from "../../services/admin/category.services";
import { ApiResponse } from "../../utils/api-response";

export const addCategory = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const data = addCategorySchema.parse(req.body);
  const result = await addCategoryService(data);
  return res.status(201).json(new ApiResponse(201, result, "Category added successfully"));
});


export const getAllCategories = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const filters = getCategoriesParamsSchema.parse(req.query);
  const result = await getAllCategoriesService(filters);
  return res.status(200).json(new ApiResponse(200, result, "Categories retrieved successfully"));
});


export const getCategoryById = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { categoryId } = req.params;
  const result = await getCategoryByIdService(categoryId);
  return res.status(200).json(new ApiResponse(200, result, "Category retrieved successfully"));
});


export const updateCategory = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { categoryId } = req.params;
  const validatedData = updateCategorySchema.parse(req.body);
  const result = await updateCategoryService(categoryId, validatedData);
  return res.status(200).json(new ApiResponse(200, result, "Category updated successfully"));
});


export const deleteCategory = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { categoryId } = req.params;
  const result = await deleteCategoryService(categoryId);
  return res.status(200).json(new ApiResponse(200, result, "Category deleted successfully"));
});
