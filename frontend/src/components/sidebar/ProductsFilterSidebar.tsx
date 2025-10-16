import React from "react";
import type { ProductParams } from "@/types/common/product.types";

interface FiltersSidebarProps {
  queryParams: ProductParams;
  updateFilters: (filter: string, value: string | number | undefined) => void;
  filtersOpen: boolean;
  clearAllFilters: () => void;
}

const sortOptions = [
  { label: "Latest", value: "latest" },
  { label: "Oldest", value: "oldest" },
  { label: "Price Ascending", value: "priceAsc" },
  { label: "Price Descending", value: "priceDesc" },
];

const FiltersSidebar: React.FC<FiltersSidebarProps> = ({ queryParams, updateFilters, filtersOpen, clearAllFilters }) => {
  const hasActiveFilters = Object.keys(queryParams).some((key) => !["page", "limit"].includes(key) && queryParams[key as keyof ProductParams] !== "");

  return (
    <div className={`${filtersOpen ? "block" : "hidden"} md:block md:w-72 flex-shrink-0 md:sticky md:top-8 md:self-start`}>
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-card p-4 sm:p-6 border border-[#E2E8F0]">
        <div className=" flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-[#0F172A]">Filters</h2>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-[#2563EB] hover:text-[#1D4ED8] transition-colors duration-300 font-medium cursor-pointer"
            >
              Clear All
            </button>
          )}
        </div>
        <div className="space-y-4 sm:space-y-6">
          <div>
            <h3 className="font-medium text-[#0F172A] text-sm sm:text-base mb-2">Category</h3>
            <input
              type="text"
              placeholder="Search category"
              value={queryParams.category || ""}
              onChange={(e) => updateFilters("category", e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] transition-all duration-300 text-sm sm:text-base text-[#0F172A] placeholder-[#64748B]"
            />
          </div>

          <div>
            <h3 className="font-medium text-[#0F172A] text-sm sm:text-base mb-2">Price Range</h3>
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Min"
                value={queryParams.minPrice || ""}
                onChange={(e) => updateFilters("minPrice", e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] transition-all duration-300 text-sm sm:text-base text-[#0F172A] placeholder-[#64748B]"
              />
              <span className="text-[#64748B] text-sm">-</span>
              <input
                type="number"
                placeholder="Max"
                value={queryParams.maxPrice || ""}
                onChange={(e) => updateFilters("maxPrice", e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] transition-all duration-300 text-sm sm:text-base text-[#0F172A] placeholder-[#64748B]"
              />
            </div>
          </div>

          <div>
            <h3 className="font-medium text-[#0F172A] text-sm sm:text-base mb-2">Sort By</h3>
            <select
              value={queryParams.sortBy || ""}
              onChange={(e) => updateFilters("sortBy", e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] transition-all duration-300 text-sm sm:text-base text-[#0F172A]"
            >
              <option value="">Default</option>
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiltersSidebar;
