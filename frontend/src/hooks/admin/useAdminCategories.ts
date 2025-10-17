import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } from "@/lib/api/admin/category.api";
import type { AddCategory, UpdateCategory, GetCategoriesParams, CategoryResponse, GetAllCategoriesResponse } from "@/types/admin/category.types";
import { useAuthUser } from "../user/useUser";
import type { ApiResponse } from "@/types/common/api.types";
import toast from "react-hot-toast";
import { getErrorMessage } from "@/lib/getErrorMessage";

export const useGetAllCategories = (params?: GetCategoriesParams) => {
  const user = useAuthUser();
  return useQuery<ApiResponse<GetAllCategoriesResponse>, unknown>({
    queryKey: ["admin", "categories", params],
    queryFn: () => getAllCategories(params),
    staleTime: Infinity,
    enabled: !!user && user.role === "admin",
  });
};

export const useGetCategoryById = (categoryId: string) => {
  return useQuery<ApiResponse<CategoryResponse>, unknown>({
    queryKey: ["admin", "category", categoryId],
    queryFn: () => getCategoryById(categoryId),
    enabled: !!categoryId,
    staleTime: Infinity,
  });
};

export const useAddCategory = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<CategoryResponse>, unknown, AddCategory>({
    mutationFn: (data) => addCategory(data),
    onSuccess: (response) => {
      toast.success(response.message || "Category added successfully");
      queryClient.invalidateQueries({ queryKey: ["admin", "categories"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (err: any) => {
      toast.error(getErrorMessage(err) || "Failed to add category");
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<CategoryResponse>, unknown, { categoryId: string; data: UpdateCategory }>({
    mutationFn: ({ categoryId, data }) => updateCategory(categoryId, data),
    onSuccess: (response) => {
      toast.success(response.message || "Category updated successfully");
      queryClient.invalidateQueries({ queryKey: ["admin", "categories"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "category", response.data._id] });

      queryClient.invalidateQueries({ queryKey: ["dashboard", "stats"] });
    },
    onError: (err: any) => {
      toast.error(getErrorMessage(err) || "Failed to update category");
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<null>, unknown, string>({
    mutationFn: (categoryId) => deleteCategory(categoryId),
    onSuccess: (response) => {
      toast.success(response.message || "Category deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["admin", "categories"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "stats"] });
    },
    onError: (err: any) => {
      toast.error(getErrorMessage(err) || "Failed to delete category");
    },
  });
};
