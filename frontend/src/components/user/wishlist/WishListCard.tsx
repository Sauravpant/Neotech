import type { WishlistResponse } from "@/types/user/wishlist.types";
import React from "react";
import { Heart, ShoppingCart, Tag, CheckCircle, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface WishListCardProps {
  wishlists: WishlistResponse["products"];
  onRemove: (productId: string) => void;
  onAddToCart: (productId: string) => void;
}

const WishListCard: React.FC<WishListCardProps> = ({ wishlists, onRemove, onAddToCart }) => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
      {wishlists.map((product) => {
        return (
          <div
            key={product._id}
            className="group bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-gray-100 overflow-hidden flex flex-col relative"
          >
            <button
              onClick={() => onRemove(product._id)}
              className="absolute top-2 right-2 z-20 w-7 h-7 sm:w-8 sm:h-8 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center text-red-500 hover:bg-red-50 hover:scale-110 transition-all duration-200 border border-red-100 cursor-pointer"
            >
              <Heart className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
            </button>
            {product.discount && product.discount > 0 && (
              <div className="absolute top-2 left-2 z-20">
                <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm flex items-center gap-1 backdrop-blur-sm">
                  <Tag className="w-2 h-2 sm:w-3 sm:h-3" />
                  {product.discount}% OFF
                </div>
              </div>
            )}
            <div
              onClick={() => navigate(`/product/${product._id}`)}
              className="relative w-full h-32 sm:h-36 bg-gradient-to-br from-slate-50 via-white to-blue-50/50 overflow-hidden flex items-center justify-center cursor-pointer"
            >
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-4/5 h-4/5 object-contain transition-transform duration-300 ease-out group-hover:scale-105"
                />
              ) : (
                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-gray-400" />
                </div>
              )}
            </div>
            <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between">
              <div className="space-y-2">
                <h3 className="font-medium text-xs sm:text-sm text-gray-900 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors duration-300">
                  {product.name}
                </h3>
                <div className="space-y-1">
                  <div className="flex items-center gap-1 flex-wrap">
                    <span className="text-sm sm:text-base font-bold text-gray-900">
                      ${(Number(product.price) * (1 - Number(product.discount) / 100)).toFixed(2)}
                    </span>
                    {product.discount && product.discount > 0 && (
                      <span className="text-xs sm:text-sm text-gray-400 line-through">${product.price}</span>
                    )}
                  </div>
                </div>
                {product.countInStock !== undefined && (
                  <div
                    className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] sm:text-xs font-medium ${
                      product.countInStock > 0
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-amber-50 text-amber-700 border border-amber-200"
                    }`}
                  >
                    {product.countInStock > 0 ? (
                      <>
                        <CheckCircle className="w-2 h-2 sm:w-3 sm:h-3" />
                        {product.countInStock} in stock
                      </>
                    ) : (
                      <>
                        <Clock className="w-2 h-2 sm:w-3 sm:h-3" />
                        Out of Stock
                      </>
                    )}
                  </div>
                )}
              </div>
              <div className="mt-2 sm:mt-3">
                <button
                  onClick={() => onAddToCart(product._id)}
                  disabled={product.countInStock === 0}
                  className={`w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg font-medium text-xs sm:text-sm transition-all duration-300 ${
                    product.countInStock && product.countInStock > 0
                      ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-sm transform hover:-translate-y-0.5"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WishListCard;
