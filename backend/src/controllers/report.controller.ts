import { Response } from "express";
import { AuthenticatedRequest } from "../types/auth.types";
import { asyncHandler } from "../utils/async-handler";
import { reportProductSchema } from "../validators/report.validators";
import { create } from "domain";
import { createReportProductService, deleteReportService, getMyReportsService } from "../services/report.services";
import { ApiResponse } from "../utils/api-response";

export const reportProduct = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { productId } = req.params;
  const data = reportProductSchema.parse(req.body);
  await createReportProductService(req.user._id.toString(), productId, data);
  return res.status(201).json(new ApiResponse(201, null, "Product reported successfully"));
});

export const deleteReport = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { reportId } = req.params;
  await deleteReportService(req.user._id.toString(), reportId);
  return res.status(200).json(new ApiResponse(200, null, "Report deleted successfully"));
});

export const getMyReports = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const reports = await getMyReportsService(req.user._id.toString());
  return res.status(200).json(new ApiResponse(200, reports, "User reports fetched successfully"));
});
