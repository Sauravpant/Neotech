import { EmptyResult } from "@/components/ui/EmptyMessage";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import CategoryCard from "@/components/user/category/CategoryCard";
import { getAllCategories } from "@/lib/api/common/category.api";
import type { ApiResponse } from "@/types/common/api.types";
import type { ICategory } from "@/types/common/category.types";
import { useQuery } from "@tanstack/react-query";

export const CategoryPage = () => {
  const { data, isLoading, error, refetch } = useQuery<ApiResponse<ICategory[]>, unknown>({
    queryKey: ["categories"],
    queryFn: () => getAllCategories(),
    staleTime: Infinity,
  });

  if (error) {
    return <ErrorMessage title="Error fetching Categories..." refetch={refetch} />;
  }

  if (isLoading) {
    return <LoadingScreen title="Loading Categories" subtitle="Discover amazing products..." />;
  }

  const categories = data?.data || [];

  return (
    <div className="min-h-screen bg-slate-200 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Tech Categories
          </h1>
          <p className="tmax-w-2xl mx-auto text-lg">Explore our premium electronics collection across all categories</p>
        </div>

        {categories && categories.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
            {categories.map((category) => (
              <CategoryCard key={category._id} data={category} />
            ))}
          </div>
        ) : (
          <EmptyResult title="No Categories Found" subtitle="Try checking back later" />
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
