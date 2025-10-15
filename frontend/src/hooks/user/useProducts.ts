import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getAllProducts, getProductById } from "@/lib/api/user/product.api";
import type { GetAllProductsResponse, ProductByIdResponse, ProductParams } from "@/types/common/product.types";
import type { ApiResponse } from "@/types/common/api.types";

export const useGetAllProducts = (params: ProductParams) => {
  return useInfiniteQuery<GetAllProductsResponse, unknown>({
    queryKey: [params],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await getAllProducts({ ...params, page: pageParam as number });
      return response.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetProductById = (productId: string) => {
  return useQuery<ApiResponse<ProductByIdResponse>, unknown>({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId),
    enabled: !!productId,
    staleTime: Infinity
  });
};
