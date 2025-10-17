import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteReport, getAllReports } from "@/lib/api/admin/report.api";
import type { GetReports, ReportResponse } from "@/types/admin/report.types";
import type { ApiResponse } from "@/types/common/api.types";
import toast from "react-hot-toast";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { useAuthUser } from "../user/useUser";

export const useGetAllReports = (params?: GetReports) => {
  const user = useAuthUser();
  return useQuery<ApiResponse<ReportResponse>, unknown>({
    queryKey: ["admin", "reports", params],
    queryFn: () => getAllReports(params),
    staleTime: Infinity,
    enabled: !!user && user.role === "admin",
  });
};

export const useDeleteReport = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<null>, unknown, string>({
    mutationFn: (reportId) => deleteReport(reportId),
    onSuccess: (response) => {
      toast.success(response.message || "Report deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["admin", "reports"] });
    },
    onError: (err: any) => {
      toast.error(getErrorMessage(err) || "Failed to delete report");
    },
  });
};
