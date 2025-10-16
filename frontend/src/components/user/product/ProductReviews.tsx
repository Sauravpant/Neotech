import React from "react";
import type { ProductByIdResponse } from "@/types/common/product.types";
import ProductReviewCard from "./ProductReviewCard";
import ProductReviewForm from "./ProductReviewForm";
import { Star, MessageCircle } from "lucide-react";

interface ProductReviewsProps {
  product: ProductByIdResponse;
  isAuthenticated: boolean;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ product, isAuthenticated }) => {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden">
      <div className="border-b border-gray-100">
        <div className="px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-blue-600" />
              <h2 className="text-base sm:text-lg font-bold text-gray-900">Customer Reviews</h2>
            </div>
            {product.avgRating && (
              <div className="flex items-center gap-2 sm:gap-3 sm:ml-auto">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 sm:w-5 sm:h-5 ${star <= Math.floor(product.avgRating!) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-sm sm:text-base font-bold text-gray-900">{product.avgRating.toFixed(1)} out of 5</span>
              </div>
            )}
          </div>

          <p className="text-sm text-gray-600 mt-1 sm:mt-2">
            {product.totalReviews} {product.totalReviews === 1 ? "review" : "reviews"}
          </p>
        </div>
      </div>
      <div className="p-4 sm:p-6">
        {isAuthenticated && (
          <div className="mb-6 sm:mb-8">
            <ProductReviewForm productId={product._id} />
          </div>
        )}
        <div className="space-y-4 sm:space-y-6">
          {product.reviews.length > 0 ? (
            product.reviews.map((review) => <ProductReviewCard key={review._id} review={review} />)
          ) : (
            <div className="text-center py-8 sm:py-12">
              <MessageCircle className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">No reviews yet</h3>
              <p className="text-sm sm:text-base text-gray-500 max-w-md mx-auto">Be the first to share your thoughts about this product!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductReviews;
