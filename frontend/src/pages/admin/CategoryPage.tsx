import PaginationWrapper from "@/components/common/PaginationWrapper";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { CategoriesHeader } from "@/components/admin/category/CategoryHeader";
import { CategoriesTable } from "@/components/admin/category/CategoryTable";
import { useGetAllCategories } from "@/hooks/admin/useAdminCategories";
import type { GetCategoriesParams, CategoryResponse } from "@/types/admin/category.types";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const CategoriesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState<string>(searchParams.get("search") || "");

  const queryParams: GetCategoriesParams = Object.fromEntries(searchParams.entries());
  queryParams.page = queryParams.page ? Number(queryParams.page) : 1;
  queryParams.limit = queryParams.limit ? Number(queryParams.limit) : 10;
  const { data, isLoading, error, refetch } = useGetAllCategories(queryParams);

  const categories: CategoryResponse[] = data?.data?.categories || [];
  const totalCategories = categories.length || 0;
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
    return <LoadingScreen title="Loading categories" subtitle="Fetching categories list" />;
  }

  if (error) {
    return <ErrorMessage title="Failed to load categories" refetch={refetch} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <CategoriesHeader search={search} setSearch={setSearch} totalCategories={totalCategories} applyFilters={applyFilters} />
        <div className="mb-4">
          <CategoriesTable categories={categories} />
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

export default CategoriesPage;
