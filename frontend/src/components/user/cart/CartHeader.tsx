import React from "react";
import { ShoppingCart, Trash2 } from "lucide-react";
import { useClearCart } from "@/hooks/user/useCart";

interface CartHeaderProps {
  itemCount: number;
  totalItems: number;
}

const CartHeader: React.FC<CartHeaderProps> = ({ itemCount, totalItems }) => {
  const { mutate: clearCart } = useClearCart();

  const handleClearCart = () => {
    clearCart();
  };

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-6 mb-4 sm:mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center">
            <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">Shopping Cart</h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
              {itemCount} {itemCount === 1 ? "item" : "items"} • {totalItems} total products
            </p>
          </div>
        </div>
        <button
          onClick={handleClearCart}
          className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white font-medium rounded-lg sm:rounded-xl hover:shadow-lg hover:from-red-600 hover:to-pink-700 transition-all duration-300 text-xs sm:text-sm"
        >
          <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default CartHeader;
