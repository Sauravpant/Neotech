import { api } from "@/lib/utils/axiosInstance";
import type { ApiResponse } from "@/types/common/api.types";

export const createProduct = async (data: FormData): Promise<ApiResponse<null>> => {
  const response = await api.post<ApiResponse<null>>("/admin/product/add-product", data);
  return response.data;
};

export const updateProduct = async ( data: FormData, productId: string): Promise<ApiResponse<null>> => {
  const response = await api.patch<ApiResponse<null>>(`/admin/product/update-product/${productId}`, data);
  return response.data;
};

export const deleteProduct = async (productId: string): Promise<ApiResponse<null>> => {
  const response = await api.delete<ApiResponse<null>>(`/admin/product/delete-product/${productId}`);
  return response.data;
};

