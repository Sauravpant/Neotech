import z from "zod";
import { getreportsSchema } from "../../validators/admin/report.validators";

export interface UserReport {
  _id: string;
  reportedBy: string;
  reportedProduct: string;
  reason: string;
  description: string;
}

export interface ReportResponse {
  userReports: UserReport[];
  page: number;
  limit: number;
  totalReports: number;
  total: number;
}
export type GetReports = z.infer<typeof getreportsSchema>;
