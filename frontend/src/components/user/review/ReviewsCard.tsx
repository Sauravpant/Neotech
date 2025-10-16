import React from "react";
import { Star, User } from "lucide-react";
import type { ReviewResponse } from "@/types/user/review.types";
import { formatDate } from "@/lib/helpers";
import { useDeleteReview } from "@/hooks/user/useReviews";
import { AlertBox } from "@/components/common/AlertBox";
import UpdateReviewBox from "./UpdateReview";

interface ReviewsCardProps {
  review: ReviewResponse;
}

const ReviewsCard: React.FC<ReviewsCardProps> = ({ review }) => {
  const { mutate: deleteReview } = useDeleteReview();

  const handleDeleteReview = (reviewId: string) => {
    deleteReview(reviewId);
  };
  return (
    <div className="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-4 lg:p-5">
      <div className="flex gap-2 sm:gap-3 lg:gap-4">
        <div className="flex-shrink-0">
          {review.user.imageUrl ? (
            <img
              src={review.user.imageUrl}
              alt={review.user.name}
              className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-full object-cover border border-gray-200"
            />
          ) : (
            <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <User className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 text-white" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-1.5 sm:mb-2 lg:mb-2.5">
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm sm:text-base lg:text-lg text-gray-900 mb-0.5 sm:mb-1 truncate">{review.user.name}</h3>
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <div className="flex items-center gap-0.5 sm:gap-1">{renderStars(review.rating)}</div>
                <span className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">{formatDate(review.createdAt)}</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2.5 ml-2 sm:ml-3">
              <UpdateReviewBox reviewId={review._id} />
              <AlertBox
                onSubmit={handleDeleteReview}
                id={review._id}
                button="Delete"
                question="Are you sure you want to delete this product review?"
                description="Deleting this review will permanently remove your review for the product"
                cancelButton="Cancel"
                confirmButton="Delete"
              />
            </div>
          </div>
          {review.comment && (
            <p className="text-gray-700 text-xs sm:text-sm lg:text-base leading-relaxed whitespace-pre-wrap mb-2 sm:mb-2.5">{review.comment}</p>
          )}
          <div className="mt-1.5 sm:mt-2 pt-1.5 sm:pt-2 border-t border-gray-100">
            <p className="text-xs sm:text-sm text-gray-500">
              Product: <span className="font-medium text-gray-700">{review.product}</span>
            </p>
          </div>
          {review.createdAt !== review.updatedAt && (
            <p className="text-[10px] sm:text-xs text-gray-400 mt-1 sm:mt-1.5">Updated {formatDate(review.updatedAt)}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewsCard;

const renderStars = (rating: number) => {
  return Array.from({ length: 5 }).map((_, index) => (
    <Star key={index} className={`w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 ${index < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
  ));
};
