import { Search, ArrowUpDown, X } from "lucide-react";
import { useState, useEffect } from "react";

interface OrdersHeaderProps {
  search: string;
  setSearch: (value: string) => void;
  totalOrders: number;
  applyFilters: (key: string, value: string) => void;
  clearAllFilters: () => void;
}

export const OrdersHeader: React.FC<OrdersHeaderProps> = ({ search, setSearch, totalOrders, applyFilters, clearAllFilters }) => {
  const [filters, setFilters] = useState({
    status: "",
    paymentMethod: "",
    sortBy: "desc",
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    applyFilters(key, value);
  };

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      applyFilters("search", search);
    }, 800);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold text-gray-900">Orders</h1>
          <span className="bg-gray-100 text-gray-600 text-sm px-2.5 py-1 rounded-full">
            {totalOrders} {totalOrders === 1 ? "order" : "orders"}
          </span>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search orders..."
              className="block w-full sm:w-64 pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />
          </div>
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange("status", e.target.value)}
            className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
          >
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <select
            value={filters.paymentMethod}
            onChange={(e) => handleFilterChange("paymentMethod", e.target.value)}
            className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
          >
            <option value="">All Payments</option>
            <option value="COD">COD</option>
            <option value="Stripe">Stripe</option>
          </select>
          <div className="relative">
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange("sortBy", e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg pl-3 pr-8 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            >
              <option value="desc">Latest First</option>
              <option value="asc">Oldest First</option>
            </select>
            <ArrowUpDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
          <button
            onClick={clearAllFilters}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-all"
          >
            <X className="h-4 w-4" />
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};
