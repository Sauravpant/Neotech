import { Types } from "mongoose";
import { Report } from "../../models/report.models";
import { GetReports, ReportResponse, UserReport } from "../../types/admin/report.types";
import { IProduct } from "../../types/product.types";
import { IUser } from "../../types/user.types";
import { AppError } from "../../utils/app-error";

const validateObjectId = (id: string) => Types.ObjectId.isValid(id);

export const getAllReportsService = async (filters: GetReports) :Promise<ReportResponse> => {
  const { page = 1, limit = 10, sortBy = "desc" } = filters;
  const skip = (page - 1) * limit;
  const reports = await Report.find()
    .sort({ createdAt: sortBy === "asc" ? 1 : -1 })
    .populate<{ user: IUser }>("user", "name imageUrl")
    .populate<{ product: IProduct }>("product", "name")
    .skip(skip)
    .limit(limit);
  const total = await Report.countDocuments();
  const userReports: UserReport[] = reports.map((report) => ({
    _id: report._id.toString(),
    reportedBy: report.user.name,
    reportedProduct: report.product.name,
    reason: report.reason,
    description: report.description,
  }));
  return {
    userReports,
    page,
    limit,
    totalReports: total,
    total: Math.ceil(total / limit),
  };
};

export const deleteReportService = async (reportId: string): Promise<void> => {
  if (!validateObjectId(reportId)) {
    throw new AppError(400, "Invalid report ID");
  }
  await Report.findByIdAndDelete(reportId);
};
