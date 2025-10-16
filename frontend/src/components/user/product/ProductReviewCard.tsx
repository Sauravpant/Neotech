import React from "react";
import type { ProductByIdResponse } from "@/types/common/product.types";
import { Star, User } from "lucide-react";
import { formatDate } from "@/lib/helpers";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

interface ProductReviewCardProps {
  review: ProductByIdResponse["reviews"][0];
}

const ProductReviewCard: React.FC<ProductReviewCardProps> = ({ review }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="flex-shrink-0">
          {review.user.imageUrl ? (
            <img
              src={review.user.imageUrl}
              alt={review.user.name}
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full object-cover border border-white shadow-sm"
            />
          ) : (
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-sm">
              <User className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <h4 className="font-semibold text-gray-900 text-sm sm:text-base md:text-lg">
                {review.user.name} {review.user._id === user?._id && <span className="text-xs lg:text-sm text-blue-600">(You)</span>}
              </h4>
              <div className="flex items-center gap-1">{renderStars(review.rating)}</div>
            </div>
            <span className="text-xs sm:text-sm text-gray-500 sm:ml-auto">{formatDate(review.createdAt)}</span>
          </div>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-xs sm:text-sm md:text-base">{review.comment}</p>
          {review.createdAt !== review.updatedAt && <p className="text-xs text-gray-400 mt-2">Updated {formatDate(review.updatedAt)}</p>}
        </div>
      </div>
    </div>
  );
};

export default ProductReviewCard;

const renderStars = (rating: number) => {
  return Array.from({ length: 5 }).map((_, index) => (
    <Star key={index} className={`w-3 h-3 sm:w-4 sm:h-4 ${index < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
  ));
};
