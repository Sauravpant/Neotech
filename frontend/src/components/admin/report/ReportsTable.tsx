import { AlertBox } from "@/components/common/AlertBox";
import { useDeleteReport } from "@/hooks/admin/useAdminReports";
import type { UserReport } from "@/types/admin/report.types";

interface ReportsTableProps {
  reports: UserReport[];
}

export const ReportsTable: React.FC<ReportsTableProps> = ({ reports }) => {
  const { mutate: deleteReport } = useDeleteReport();

  const handleDelete = (id: string) => {
    deleteReport(id);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-xs uppercase">SN</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-xs uppercase">Reported By</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-xs uppercase">Reported Product</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-xs uppercase">Reason</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-xs uppercase">Description</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-xs uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {reports.map((report, index) => (
              <tr key={report._id} className="hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4 text-gray-600 font-medium">{index + 1}</td>
                <td className="py-3 px-4">
                  <div className="font-medium text-gray-900 text-sm">{report.reportedBy}</div>
                </td>
                <td className="py-3 px-4">
                  <div className="font-medium text-gray-900 text-sm">{report.reportedProduct}</div>
                </td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-50 text-orange-700">
                    {report.reason}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="text-gray-600 text-sm max-w-[200px] truncate" title={report.description}>
                    {report.description}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <AlertBox
                    className="bg-red-500 hover:bg-red-600 text-xs text-white px-3 py-1 rounded-lg"
                    button="Delete"
                    question="Are you sure you want to delete this report?"
                    description="This action will remove all the report details"
                    confirmButton="Delete"
                    cancelButton="Cancel"
                    onSubmit={handleDelete}
                    id={report._id}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
