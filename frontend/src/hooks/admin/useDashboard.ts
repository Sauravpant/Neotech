import { useQuery } from "@tanstack/react-query";
import { getDashboardStats } from "@/lib/api/admin/dashboard.api";
import { useAuthUser } from "../user/useUser";
import type { CategoryResponse } from "@/types/admin/category.types";
import type { OrderStats } from "@/types/admin/order.types";
import type { UserStats } from "@/types/admin/user.types";
import type { ApiResponse } from "@/types/common/api.types";
export const useGetDashboardStats = () => {
  const user = useAuthUser();
  return useQuery<ApiResponse<{ userStats: UserStats; orderStats: OrderStats; category: CategoryResponse[] }>, unknown>({
    queryKey: ["dashboard", "stats"],
    queryFn: () => getDashboardStats(),
    staleTime: Infinity,
    enabled: !!user && user.role === "admin",
  });
};
