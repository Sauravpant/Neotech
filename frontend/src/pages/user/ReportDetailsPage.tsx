import { EmptyResult } from "@/components/ui/EmptyMessage";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { useGetMyReports } from "@/hooks/user/useReports";
import ReportCard from "@/components/user/report/ReportsCard";
import { Flag } from "lucide-react";

const ReportDetailsPage = () => {
  const { data, isLoading, error, refetch } = useGetMyReports();

  const reports = data?.data || [];
  if (isLoading) {
    return <LoadingScreen title="Loading reports" subtitle="Fetching your reported issues" />;
  }

  if (error) {
    return <ErrorMessage title="Failed to load reports" refetch={refetch} />;
  }

  if (reports.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50/30 py-6 sm:py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <EmptyResult title="No reports yet" subtitle="You haven't reported any issues yet." />
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50/30 py-4 sm:py-6">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 max-w-4xl">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl sm:rounded-2xl flex items-center justify-center">
              <Flag className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">My Reports</h1>
              <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                {reports.length} {reports.length === 1 ? "report" : "reports"} submitted
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg sm:rounded-xl p-3 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-50 rounded-lg flex items-center justify-center">
              <Flag className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" />
            </div>
            <div>
              <p className="text-base sm:text-lg font-bold text-gray-900">{reports.length}</p>
              <p className="text-[10px] sm:text-xs text-gray-600">Total Reports</p>
            </div>
          </div>
        </div>
        <div className="space-y-3 sm:space-y-4">
          {reports.map((report) => (
            <ReportCard key={report._id} report={report} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportDetailsPage;
