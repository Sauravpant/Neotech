import { api } from "@/lib/utils/axiosInstance";
import type { ApiResponse } from "@/types/common/api.types";
import type { GetAllProductsResponse, ProductByIdResponse, ProductParams } from "@/types/common/product.types";

export const getAllProducts = async (params?: ProductParams): Promise<ApiResponse<GetAllProductsResponse>> => {
  const response = await api.get<ApiResponse<GetAllProductsResponse>>("/product/get-all-products", {
    params,
  });
  return response.data;
};

export const getProductById = async (productId: string): Promise<ApiResponse<ProductByIdResponse>> => {
  const response = await api.get<ApiResponse<ProductByIdResponse>>(`/product/${productId}`);
  return response.data;
};
