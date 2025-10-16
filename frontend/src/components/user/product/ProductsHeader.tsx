import React from "react";
import { Filter } from "lucide-react";

interface ProductsHeaderProps {
  queryParams: Record<string, any>;
  filtersOpen: boolean;
  setFiltersOpen: (open: boolean) => void;
}

const ProductsHeader: React.FC<ProductsHeaderProps> = ({ queryParams, filtersOpen, setFiltersOpen }) => {
  const activeFilters = Object.keys(queryParams).filter((key) => !["page", "limit"].includes(key) && queryParams[key]);

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-3">
      <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800">Products ({queryParams.name ? `Search: ${queryParams.name}` : "All"})</h1>

      <button
        onClick={() => setFiltersOpen(!filtersOpen)}
        className="md:hidden flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-lg lg:text-xl"
      >
        <Filter className="w-4 h-4" />
        {activeFilters.length > 0 ? `Filters (${activeFilters.length})` : "Filters"}
      </button>
    </div>
  );
};

export default ProductsHeader;
