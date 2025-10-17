import { api } from "@/lib/utils/axiosInstance";
import type { ApiResponse } from "@/types/common/api.types";
import type { GetReports, ReportResponse } from "@/types/admin/report.types";

export const getAllReports = async (params?: GetReports): Promise<ApiResponse<ReportResponse>> => {
  const response = await api.get<ApiResponse<ReportResponse>>("/admin/report/get-all-reports", {
    params,
  });
  return response.data;
};

export const deleteReport = async (reportId: string): Promise<ApiResponse<null>> => {
  const response = await api.delete<ApiResponse<null>>(`/admin/report/delete-report/${reportId}`);
  return response.data;
};
