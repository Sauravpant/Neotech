import PaginationWrapper from "@/components/common/PaginationWrapper";
import { EmptyResult } from "@/components/ui/EmptyMessage";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { ReportsHeader } from "@/components/admin/report/ReportsHeader";
import { ReportsTable } from "@/components/admin/report/ReportsTable";
import { useGetAllReports } from "@/hooks/admin/useAdminReports";
import type { GetReports, UserReport } from "@/types/admin/report.types";
import { useSearchParams } from "react-router-dom";

const ReportsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParams: GetReports = Object.fromEntries(searchParams.entries());
  queryParams.page = queryParams.page ? Number(queryParams.page) : 1;
  queryParams.limit = queryParams.limit ? Number(queryParams.limit) : 10;

  const { data, isLoading, error, refetch } = useGetAllReports();

  const reports: UserReport[] = data?.data?.userReports || [];
  const totalReports = data?.data?.totalReports || 0;
  const totalPages = data?.data?.total || 0;

  const applyFilters = (key: string, value: string) => {
    const updated = new URLSearchParams(searchParams);
    value ? updated.set(key, value) : updated.delete(key);
    updated.set("page", "1");
    setSearchParams(updated);
  };

  const goToPage = (page: number) => {
    const updated = new URLSearchParams(searchParams);
    updated.set("page", page.toString());
    setSearchParams(updated);
  };

  if (isLoading) {
    return <LoadingScreen title="Loading your reports" subtitle="Fetching your reports list" />;
  }

  if (error) {
    return <ErrorMessage title="Failed to load reports" refetch={refetch} />;
  }

  if (!reports || reports.length === 0) {
    return <EmptyResult title="No reports found" subtitle="There are no reports currently" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <ReportsHeader totalReports={totalReports} applyFilters={applyFilters} />
        <div className="mb-4">
          <ReportsTable reports={reports} />
        </div>
        {totalPages > 1 && (
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <PaginationWrapper totalPages={totalPages} currentPage={queryParams.page} goToPage={goToPage} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsPage;
