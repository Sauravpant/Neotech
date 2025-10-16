import React, { useState } from "react";
import { Star, Send, Loader } from "lucide-react";
import { useCreateReview } from "@/hooks/user/useReviews";
import type { CreateReview } from "@/types/user/review.types";

interface ProductReviewFormProps {
  productId: string;
}

const ProductReviewForm: React.FC<ProductReviewFormProps> = ({ productId }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const { mutate, isPending } = useCreateReview();

  const handleSubmit = async (e: React.FormEvent, productId: string) => {
    e.preventDefault();
    if (rating === 0) return;
    const reviewData: CreateReview = { rating };
    if (comment.trim()) {
      reviewData.comment = comment.trim();
    }
    mutate({ productId, data: reviewData });
    setRating(0);
    setComment("");
  };

  const renderStars = () => {
    return Array.from({ length: 5 }).map((_, index) => {
      const starValue = index + 1;
      return (
        <button
          key={starValue}
          type="button"
          onClick={() => setRating(starValue)}
          onMouseEnter={() => setHoverRating(starValue)}
          onMouseLeave={() => setHoverRating(0)}
          className="transition-transform duration-200 hover:scale-110 focus:outline-none"
        >
          <Star className={`w-5 h-5 sm:w-6 sm:h-6 ${starValue <= (hoverRating || rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
        </button>
      );
    });
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 sm:p-5 shadow-sm border border-blue-100">
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">Write a Review</h3>
      <form onSubmit={(e) => handleSubmit(e, productId)} className="space-y-3 sm:space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-2">Your Rating *</label>
          <div className="flex items-center gap-1">
            {renderStars()}
            <span className="ml-2 text-xs sm:text-sm font-medium text-gray-700">
              {rating > 0 ? `${rating} star${rating > 1 ? "s" : ""}` : "Select rating"}
            </span>
          </div>
        </div>
        <div>
          <label htmlFor="comment" className="block text-xs font-medium text-gray-700 mb-2">
            Your Review *
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your thoughts about this product..."
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none text-xs sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          disabled={rating === 0 || isPending}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg transition-all duration-300 hover:bg-blue-700 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          {isPending ? (
            <>
              <Loader className="animate-spin w-4 h-4" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Submit Review
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ProductReviewForm;
