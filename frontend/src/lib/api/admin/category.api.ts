import { api } from "@/lib/utils/axiosInstance";
import type { ApiResponse } from "@/types/common/api.types";
import type { AddCategory, UpdateCategory, GetCategoriesParams, GetAllCategoriesResponse, CategoryResponse } from "@/types/admin/category.types";

export const addCategory = async (data: AddCategory): Promise<ApiResponse<CategoryResponse>> => {
  const response = await api.post<ApiResponse<CategoryResponse>>("/admin/category/add-category", data);
  return response.data;
};

export const getAllCategories = async (params?: GetCategoriesParams): Promise<ApiResponse<GetAllCategoriesResponse>> => {
  const response = await api.get<ApiResponse<GetAllCategoriesResponse>>("/admin/category/get-all-categories", {
    params,
  });
  return response.data;
};

export const getCategoryById = async (categoryId: string): Promise<ApiResponse<CategoryResponse>> => {
  const response = await api.get<ApiResponse<CategoryResponse>>(`/admin/category/get-category/${categoryId}`);
  return response.data;
};

export const updateCategory = async (categoryId: string, data: UpdateCategory): Promise<ApiResponse<CategoryResponse>> => {
  const response = await api.patch<ApiResponse<CategoryResponse>>(`/admin/category/update-category/${categoryId}`, data);
  return response.data;
};

export const deleteCategory = async (categoryId: string): Promise<ApiResponse<null>> => {
  const response = await api.delete<ApiResponse<null>>(`/admin/category/delete-category/${categoryId}`);
  return response.data;
};

