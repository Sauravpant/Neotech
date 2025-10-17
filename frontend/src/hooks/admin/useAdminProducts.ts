import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createProduct, updateProduct, deleteProduct } from "@/lib/api/admin/product.api";
import { getAllProducts, getProductById } from "@/lib/api/user/product.api";
import type { GetAllProductsResponse, ProductByIdResponse, ProductParams } from "@/types/common/product.types";
import type { ApiResponse } from "@/types/common/api.types";
import toast from "react-hot-toast";
import { getErrorMessage } from "@/lib/getErrorMessage";

export const useGetAllProducts = (params: ProductParams) => {
  return useQuery<ApiResponse<GetAllProductsResponse>, unknown>({
    queryKey: ["products", params],
    queryFn: () => getAllProducts(params),
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetProductById = (productId: string) => {
  return useQuery<ApiResponse<ProductByIdResponse>, unknown>({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId),
    enabled: !!productId,
    staleTime: Infinity,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<null>, unknown, FormData>({
    mutationFn: (data) => createProduct(data),
    onSuccess: (response) => {
      toast.success(response.message || "Product created successfully");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "stats"] });
    },
    onError: (err: any) => {
      toast.error(getErrorMessage(err) || "Failed to create product");
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<null>, unknown, { data: FormData; productId: string }>({
    mutationFn: ({ productId, data }) => updateProduct(data, productId),
    onSuccess: (response) => {
      toast.success(response.message || "Product updated successfully");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
    onError: (err: any) => {
      toast.error(getErrorMessage(err) || "Failed to update product");
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<null>, unknown, string>({
    mutationFn: (productId) => deleteProduct(productId),
    onSuccess: (response) => {
      toast.success(response.message || "Product deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "categories"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "stats"] });
    },
    onError: (err: any) => {
      toast.error(getErrorMessage(err) || "Failed to delete product");
    },
  });
};
