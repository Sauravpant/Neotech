import { Types } from "mongoose";
import { ReportProductInput, ReportResponse } from "../types/report.types";
import { AppError } from "../utils/app-error";
import { Report } from "../models/report.models";
import { IProduct } from "../types/product.types";
import { report } from "process";

const validateObjectId = (id: string) => Types.ObjectId.isValid(id);

export const createReportProductService = async (userId: string, productId: string, data: ReportProductInput): Promise<void> => {
  if (!validateObjectId(productId) || !validateObjectId(userId)) {
    throw new AppError(400, "Invalid user or product ID");
  }
  const reportExists = await Report.findOne({ product: productId, user: userId });
  if (reportExists) {
    throw new AppError(400, "You have already reported this product");
  }
  await Report.create({
    product: productId,
    user: userId,
    ...data,
  });
};

export const deleteReportService = async (userId: string, reportId: string): Promise<void> => {
  if (!validateObjectId(reportId) || !validateObjectId(userId)) {
    throw new AppError(400, "Invalid user or report ID");
  }
  await Report.findOneAndDelete({
    _id: reportId,
    user: userId,
  });
};

export const getMyReportsService = async (userId: string): Promise<ReportResponse[]> => {
  if (!validateObjectId(userId)) {
    throw new AppError(400, "Invalid user ID");
  }
  const reports = await Report.find({
    user: userId,
  }).populate<{ product: IProduct }>("product", "name imageUrl");
  const userReports: ReportResponse[] = reports.map((report) => ({
    _id: report._id.toString(),
    product: {
      _id: report.product._id.toString(),
      name: report.product.name,
      imageUrl: report.product.imageUrl,
    },
    reason: report.reason,
    description: report.description,
    createdAt: report.createdAt,
  }));
  return userReports;
};
