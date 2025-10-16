import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { reportProduct, getMyReports, deleteReport } from "@/lib/api/user/report.api";
import type { ReportProductInput, ReportResponse } from "@/types/user/report.types";
import toast from "react-hot-toast";
import { getErrorMessage } from "@/lib/getErrorMessage";
import type { ApiResponse } from "@/types/common/api.types";

export const useGetMyReports = () => {
  return useQuery<ApiResponse<ReportResponse[]>, unknown>({
    queryKey: ["reports"],
    queryFn: () => getMyReports(),
    staleTime: Infinity,
  });
};

export const useReportProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<null>, unknown, { productId: string; data: ReportProductInput }>({
    mutationFn: ({ productId, data }: { productId: string; data: ReportProductInput }) => reportProduct(productId, data),
    onSuccess: (response) => {
      toast.success(response.message || "Product reported successfully");
      queryClient.invalidateQueries({ queryKey: ["reports"] });
    },
    onError: (err: any) => {
      toast.error(getErrorMessage(err) || "Failed to report product");
    },
  });
};

export const useDeleteReport = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<null>, unknown, string>({
    mutationFn: (reportId: string) => deleteReport(reportId),
    onSuccess: (response) => {
      toast.success(response.message || "Report deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["reports"] });
    },
    onError: (err: any) => {
      toast.error(getErrorMessage(err) || "Failed to delete report");
    },
  });
};
