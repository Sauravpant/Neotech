import { Request, Response } from "express";
import { asyncHandler } from "../../utils/async-handler";
import { getreportsSchema } from "../../validators/admin/report.validators";
import { deleteReportService, getAllReportsService } from "../../services/admin/report.services";
import { ApiResponse } from "../../utils/api-response";

export const getAllReports = asyncHandler(async (req: Request, res: Response) => {
  const filters = getreportsSchema.parse(req.query);
  const result = await getAllReportsService(filters);
  return res.status(200).json(new ApiResponse(200, result, "Reports fetched successfully"));
});


export const deleteReport = asyncHandler(async (req: Request, res: Response) => {
  const { reportId } = req.params;
  await deleteReportService(reportId);
  return res.status(200).json(new ApiResponse(200, null, "Report deleted successfully"));
});

