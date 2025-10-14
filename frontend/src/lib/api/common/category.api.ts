import { api } from "@/lib/utils/axiosInstance";
import type { ApiResponse } from "@/types/common/api.types";
import type { ICategory } from "@/types/common/category.types";

export const getAllCategories = async (): Promise<ApiResponse<ICategory[]>> => {
  const response = await api.get<ApiResponse<ICategory[]>>("/category/get-all-categories");
  return response.data;
};
