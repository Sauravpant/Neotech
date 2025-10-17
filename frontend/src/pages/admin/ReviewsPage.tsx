import PaginationWrapper from "@/components/common/PaginationWrapper";
import { EmptyResult } from "@/components/ui/EmptyMessage";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { ReviewsHeader } from "@/components/admin/review/ReviewHeader";
import { ReviewsTable } from "@/components/admin/review/ReviewTable";
import { useGetAllReviews } from "@/hooks/admin/useAdminReviews";
import type { GetReviews, UserReviews } from "@/types/admin/review.types";
import { useSearchParams } from "react-router-dom";

const ReviewsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParams: GetReviews = Object.fromEntries(searchParams.entries());
  queryParams.page = queryParams.page ? Number(queryParams.page) : 1;
  queryParams.limit = queryParams.limit ? Number(queryParams.limit) : 10;

  const { data, isLoading, error, refetch } = useGetAllReviews(queryParams);

  const reviews: UserReviews[] = data?.data?.userReviews || [];
  const totalReviews = data?.data?.totalReviews || 0;
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
    return <LoadingScreen title="Loading reviews" subtitle="Fetching reviews list" />;
  }

  if (error) {
    return <ErrorMessage title="Failed to load reviews" refetch={refetch} />;
  }

  if (!reviews || reviews.length === 0) {
    return <EmptyResult title="No reviews found" subtitle="There are no reviews currently" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <ReviewsHeader totalReviews={totalReviews} applyFilters={applyFilters} />
        <div className="mb-4">
          <ReviewsTable reviews={reviews} />
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

export default ReviewsPage;
