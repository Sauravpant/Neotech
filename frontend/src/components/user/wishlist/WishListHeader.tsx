import React from "react";
import { Heart, Trash2, ShoppingBag, Zap } from "lucide-react";

interface WishlistHeaderProps {
  itemCount: number;
  onSaleCount: number;
  outOfStockCount: number;
  onClearWishlist: () => void;
  isClearing: boolean;
}

const WishlistHeader: React.FC<WishlistHeaderProps> = ({ itemCount, onSaleCount, outOfStockCount, onClearWishlist, isClearing }) => {
  return (
    <>
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-6 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-pink-500 to-red-500 rounded-xl sm:rounded-2xl flex items-center justify-center">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">My Wishlist</h1>
              <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                {itemCount} {itemCount === 1 ? "item" : "items"} saved for later
              </p>
            </div>
          </div>

          <button
            onClick={onClearWishlist}
            disabled={isClearing}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-medium rounded-lg sm:rounded-xl hover:shadow-md hover:from-gray-700 hover:to-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm cursor-pointer"
          >
            <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
            {isClearing ? "Clearing..." : "Clear All"}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6">
        <div className="bg-white rounded-lg sm:rounded-xl p-3 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-50 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-base sm:text-lg font-bold text-gray-900">{itemCount}</p>
              <p className="text-[10px] sm:text-xs text-gray-600">Total</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg sm:rounded-xl p-3 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-50 rounded-lg flex items-center justify-center">
              <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
            </div>
            <div>
              <p className="text-base sm:text-lg font-bold text-gray-900">{onSaleCount}</p>
              <p className="text-[10px] sm:text-xs text-gray-600">On Sale</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg sm:rounded-xl p-3 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-amber-50 rounded-lg flex items-center justify-center">
              <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-amber-600" />
            </div>
            <div>
              <p className="text-base sm:text-lg font-bold text-gray-900">{outOfStockCount}</p>
              <p className="text-[10px] sm:text-xs text-gray-600">Out of Stock</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WishlistHeader;
