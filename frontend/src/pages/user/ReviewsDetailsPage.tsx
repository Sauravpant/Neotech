import { EmptyResult } from "@/components/ui/EmptyMessage";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { useGetMyReviews } from "@/hooks/user/useReviews";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import ReviewsCard from "@/components/user/review/ReviewsCard";
import { MessageCircle } from "lucide-react";

const ReviewsDetailsPage = () => {
  const { data, isLoading, error, refetch } = useGetMyReviews();

  const reviews = data?.data || [];

  if (isLoading) {
    return <LoadingScreen title="Loading your reviews" subtitle="Fetching your review history" />;
  }

  if (error) {
    return <ErrorMessage title="Failed to load reviews" refetch={refetch} />;
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50/30 py-6 sm:py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <EmptyResult title="No reviews yet" subtitle="You haven't reviewed any products yet. Start sharing your thoughts!" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50/30 py-4 sm:py-6">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 max-w-4xl">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center">
              <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">My Reviews</h1>
              <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                {reviews.length} {reviews.length === 1 ? "review" : "reviews"} across your purchases
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-3 sm:space-y-4">
          {reviews.map((review) => (
            <ReviewsCard key={review._id} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewsDetailsPage;
