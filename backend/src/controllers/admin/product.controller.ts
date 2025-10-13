import { Request, Response } from "express";
import { asyncHandler } from "../../utils/async-handler";
import { AppError } from "../../utils/app-error";
import { createProductSchema, updateProductSchema } from "../../validators/admin/product.validators";
import { addProductService, deleteProductService, updateProductService } from "../../services/admin/product.services";
import { ApiResponse } from "../../utils/api-response";

export const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const file = req.file;
  if (!file) {
    throw new AppError(400, "Product Image is required");
  }
  const data = createProductSchema.parse(req.body);
  const result = await addProductService(data, { fileBuffer: file.buffer, fileName: file.originalname });
  return res.status(201).json(new ApiResponse(201, result, "Product created successfully"));
});

export const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const { productId } = req.params;
  const file = req.file;
  const data = updateProductSchema.parse(req.body);
  await updateProductService(productId, data, { fileBuffer: file?.buffer, fileName: file?.originalname });
  return res.status(200).json(new ApiResponse(200, null, "Product updated successfully"));
});

export const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const { productId } = req.params;   
  await deleteProductService(productId);  
  return res.status(200).json(new ApiResponse(200, null, "Product deleted successfully"));
});