import React from "react";
import type { ProductByIdResponse } from "@/types/common/product.types";
import { Star, Shield, CheckCircle, Clock, Tag, ShoppingCart, Heart } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import toast from "react-hot-toast";
import { useReportProduct } from "@/hooks/user/useReports";
import type { ReportProductInput } from "@/types/user/report.types";
import { ReportProductBox } from "./ProductReportDialog";
import { useAddToWishlist, useGetMyWishlist } from "@/hooks/user/useWishlist";

interface ProductInfoProps {
  product: ProductByIdResponse;
  onAddToCart: (productId: string) => void;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product, onAddToCart }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const { mutate: reportProduct, isPending: reportPending } = useReportProduct();

  const handleReportProduct = (productId: string, data: ReportProductInput) => {
    if (!isAuthenticated) {
      toast.error("Please log in to report a product.");
      return;
    }
    reportProduct({ productId, data });
  };
  let isWishlisted = false;

  const { data } = useGetMyWishlist();
  const { mutate: addToWishlist } = useAddToWishlist();

  if (isAuthenticated) {
    isWishlisted = data?.data?.products.some((item) => item._id === product._id) || false;
  }

  const handleAddToWishlist = (productId: string) => {
    if (isAuthenticated) {
      addToWishlist(productId);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 relative">
      {isAuthenticated && (
        <button
          onClick={() => handleAddToWishlist(product._id)}
          disabled={isWishlisted}
          className={`absolute top-0 right-0 flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 z-10 cursor-pointer ${
            isWishlisted
              ? "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"
              : "bg-white text-gray-400 border border-gray-200 hover:text-red-500 hover:border-red-200 hover:bg-red-50"
          }`}
        >
          <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
        </button>
      )}
      <div className="space-y-3">
        {product.category && (
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1.5 rounded-xl text-xs font-medium">
            <Tag className="w-3 h-3" />
            {product.category.name}
          </div>
        )}

        <div className="flex items-center gap-3 flex-wrap">
          {product.avgRating && (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">{renderStars(product.avgRating)}</div>
              <span className="text-sm font-bold text-gray-900">{product.avgRating.toFixed(1)}</span>
              <span className="text-gray-500 text-xs">({product.totalReviews} reviews)</span>
            </div>
          )}
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-semibold ${
              product.countInStock > 0
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-rose-50 text-rose-700 border border-rose-200"
            }`}
          >
            {product.countInStock > 0 ? (
              <>
                <CheckCircle className="w-3 h-3" />
                <span>In stock</span>
              </>
            ) : (
              <>
                <Clock className="w-3 h-3" />
                Out of Stock
              </>
            )}
          </div>
        </div>
      </div>
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight pr-12">{product.name}</h1>
      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{product.description}</p>
      <div className="space-y-2">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-2xl sm:text-3xl font-bold text-gray-900">
            ${(Number(product.price) * (1 - Number(product.discount) / 100)).toFixed(2)}
          </span>
          {product.discount > 0 && (
            <>
              <span className="text-lg sm:text-xl text-gray-400 line-through">${product.price.toFixed(2)}</span>
              <span className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-3 py-1.5 rounded-xl text-sm font-bold">
                Save {product.discount}%
              </span>
            </>
          )}
        </div>

        {product.discount > 0 && (
          <p className="text-green-600 font-medium flex items-center gap-2 text-xs sm:text-sm">
            <Shield className="w-4 h-4" />
            Great deal! You're saving ${((Number(product.discount) / 100) * Number(product.price)).toFixed(2)} with this discount.
          </p>
        )}
      </div>
      <div className="pt-3 space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => onAddToCart(product._id)}
            disabled={product.countInStock === 0}
            className={`flex-1 flex items-center justify-center gap-3 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 relative overflow-hidden cursor-pointer group ${
              product.countInStock > 0
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-xl hover:shadow-blue-500/30 hover:from-blue-700 hover:to-purple-700 transform hover:-translate-y-0.5 active:scale-95"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <ShoppingCart className={`w-5 h-5 transition-all duration-300 ${product.countInStock > 0 ? "group-hover:scale-110" : ""}`} />
            <span className="relative">{product.countInStock > 0 ? "Add to Cart" : "Out of Stock"}</span>
          </button>
          {isAuthenticated && (
            <ReportProductBox
              buttonText="Report Product"
              title="Report Product"
              description="Please provide a reason for reporting this product."
              isSubmitting={reportPending}
              onSubmit={(data: ReportProductInput) => handleReportProduct(product._id, data)}
            />
          )}
        </div>
        {product.countInStock > 0 && (
          <p className="text-xs text-gray-500 text-center sm:text-left">✓ Free shipping • ✓ 30-day money-back guarantee • ✓ 1-year warranty</p>
        )}
      </div>
    </div>
  );
};

export default ProductInfo;

const renderStars = (rating: number) => {
  return Array.from({ length: 5 }).map((_, index) => (
    <Star key={index} className={`w-4 h-4 ${index < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
  ));
};
