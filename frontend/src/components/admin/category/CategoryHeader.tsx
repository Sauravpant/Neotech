import { Search } from "lucide-react";
import { useEffect } from "react";
import AddCategoryCard from "./AddCategoryCard";

interface CategoriesHeaderProps {
  search: string;
  setSearch: (value: string) => void;
  totalCategories: number;
  applyFilters: (key: string, value: string) => void;
}

export const CategoriesHeader: React.FC<CategoriesHeaderProps> = ({ search, setSearch, totalCategories, applyFilters }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      applyFilters("search", search);
    }, 800);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold text-gray-900">Categories</h1>
          <span className="bg-gray-100 text-gray-600 text-sm px-2.5 py-1 rounded-full">
            {totalCategories} {totalCategories === 1 ? "category" : "categories"}
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
              placeholder="Search by name, description or slug"
              className="block w-full sm:w-64 pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />
          </div>
          <AddCategoryCard />
        </div>
      </div>
    </div>
  );
};
