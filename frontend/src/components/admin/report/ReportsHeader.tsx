import { ArrowUpDown } from "lucide-react";
import { useState } from "react";

interface ReportsHeaderProps {
  totalReports: number;
  applyFilters: (key: string, value: string) => void;
}

export const ReportsHeader: React.FC<ReportsHeaderProps> = ({ totalReports, applyFilters }) => {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const handleSortChange = (order: "asc" | "desc") => {
    setSortOrder(order);
    applyFilters("sort", order);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold text-gray-900">Reports</h1>
          <span className="bg-gray-100 text-gray-600 text-sm px-2.5 py-1 rounded-full">
            {totalReports} {totalReports === 1 ? "report" : "reports"}
          </span>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex gap-2">
            <div className="relative">
              <select
                value={sortOrder}
                onChange={(e) => handleSortChange(e.target.value as "asc" | "desc")}
                className="appearance-none bg-white border border-gray-300 rounded-lg pl-3 pr-8 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              >
                <option value="desc">Latest First</option>
                <option value="asc">Oldest First</option>
              </select>
              <ArrowUpDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
