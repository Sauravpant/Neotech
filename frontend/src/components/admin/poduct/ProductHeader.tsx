import { Search, X } from "lucide-react";
import { useState, useEffect } from "react";
import AddProductCard from "./AddProductCard";

interface ProductsHeaderProps {
  search: string;
  setSearch: (value: string) => void;
  totalProducts: number;
  applyFilters: (key: string, value: string) => void;
  clearAllFilters: () => void;
}

export const ProductsHeader: React.FC<ProductsHeaderProps> = ({ search, setSearch, totalProducts, applyFilters, clearAllFilters }) => {
  const [filters, setFilters] = useState({
    category: "",
    sortBy: "latest",
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    applyFilters(key, value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      applyFilters("name", search);
    }, 800);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold text-gray-900">Products</h1>
          <span className="bg-gray-100 text-gray-600 text-sm px-2.5 py-1 rounded-full">
            {totalProducts} {totalProducts === 1 ? "product" : "products"}
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
              placeholder="Search products..."
              className="block w-full sm:w-64 pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />
          </div>
          <select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange("sortBy", e.target.value)}
            className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
          </select>

          <button
            onClick={clearAllFilters}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-all"
          >
            <X className="h-4 w-4" />
            Clear
          </button>
          <AddProductCard />
        </div>
      </div>
    </div>
  );
};
