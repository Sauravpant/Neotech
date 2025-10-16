import { api } from "@/lib/utils/axiosInstance";
import type { ApiResponse } from "@/types/common/api.types";
import type { ReportProductInput, ReportResponse } from "@/types/user/report.types";

export const reportProduct = async (productId: string, data: ReportProductInput): Promise<ApiResponse<null>> => {
  const response = await api.post<ApiResponse<null>>(`/report/report-product/${productId}`, data);
  return response.data;
};

export const deleteReport = async (reportId: string): Promise<ApiResponse<null>> => {
  const response = await api.delete<ApiResponse<null>>(`/report/delete-report/${reportId}`);
  return response.data;
};

export const getMyReports = async (): Promise<ApiResponse<ReportResponse[]>> => {
  const response = await api.get<ApiResponse<ReportResponse[]>>("/report/my-reports");
  return response.data;
};
