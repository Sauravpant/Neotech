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

export interface GetReports {
  page?: number;
  limit?: number;
  sortBy?: "asc" | "desc";
}

