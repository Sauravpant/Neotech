import React from "react";
import { Flag, Trash2, Calendar, AlertCircle } from "lucide-react";
import type { ReportResponse } from "@/types/user/report.types";
import { formatDate } from "@/lib/helpers";
import { useDeleteReport } from "@/hooks/user/useReports";

interface ReportCardProps {
  report: ReportResponse;
}

const ReportCard: React.FC<ReportCardProps> = ({ report }) => {
  const { mutate: deleteReport } = useDeleteReport();

  const handleDeleteReport = (reportId: string) => {
    deleteReport(reportId);
  };
  return (
    <div className="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-4 lg:p-5">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
        <div className="flex-1 space-y-2 sm:space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <Flag className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
              <span className="font-medium text-sm sm:text-base text-gray-900">Report #{report._id.slice(-8)}</span>
            </div>
            <button
              onClick={() => handleDeleteReport(report._id)}
              className="flex items-center gap-1 px-2 sm:px-3 py-1.5 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 transition-all duration-200 text-xs sm:text-sm font-medium"
            >
              <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Delete</span>
            </button>
          </div>
          <div className="flex items-start gap-3">
            <img
              src={report.product.imageUrl}
              alt={report.product.name}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg object-cover border border-gray-200"
            />
            <div className="flex-1">
              <h3 className="font-medium text-sm sm:text-base text-gray-900 mb-1">{report.product.name}</h3>
              <p className="text-xs sm:text-sm text-gray-600">Product ID: {report.product._id.slice(-8)}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-900 mb-1">Reason: {report.reason}</p>
              {report.description && <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{report.description}</p>}
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-500">
            <Calendar className="w-3 h-3" />
            <span>Reported on {formatDate(report.createdAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;
