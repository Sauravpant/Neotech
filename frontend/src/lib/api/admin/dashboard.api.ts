import { api } from "@/lib/utils/axiosInstance";
import type { ApiResponse } from "@/types/common/api.types";
import type { UserStats } from "@/types/admin/user.types";
import type { OrderStats } from "@/types/admin/order.types";
import type { CategoryResponse, GetAllCategoriesResponse } from "@/types/admin/category.types";

export const getDashboardStats = async (): Promise<
  ApiResponse<{
    userStats: UserStats;
    orderStats: OrderStats;
    category: CategoryResponse[];
  }>
> => {
  const [userStatsResponse, orderStatsResponse, categoryResponse] = await Promise.all([
    api.get<ApiResponse<UserStats>>("/admin/user/get-stats"),
    api.get<ApiResponse<OrderStats>>("/admin/order/get-order-stats"),
    api.get<ApiResponse<GetAllCategoriesResponse>>("/admin/category/get-all-categories"),
  ]);

  return {
    success: true,
    message: "Dashboard stats retrieved successfully",
    statusCode: 200,
    data: {
      userStats: userStatsResponse.data.data,
      orderStats: orderStatsResponse.data.data,
      category: categoryResponse.data.data.categories,
    },
  };
};
