import React from "react";
import { Minus, Plus, Trash2, Zap } from "lucide-react";
import { useDecrementQuantity, useIncrementQuantity, useRemoveFromCart } from "@/hooks/user/useCart";
import type { CartResponse } from "@/types/user/cart.types";

interface CartCardProps {
  item: CartResponse["items"][0];
}

const CartCard: React.FC<CartCardProps> = ({ item }) => {
  const discountedPrice = item.product.discount > 0 ? item.product.price * (1 - item.product.discount / 100) : item.product.price;

  const totalPrice = discountedPrice * item.quantity;
  const totalOriginalPrice = item.product.price * item.quantity;
  const totalSaved = totalOriginalPrice - totalPrice;

  const { mutate: incrementQuantity } = useIncrementQuantity();
  const { mutate: decrementQuantity } = useDecrementQuantity();
  const { mutate: removeFromCart } = useRemoveFromCart();

  const handleIncrement = () => {
    incrementQuantity(item.product._id);
  };

  const handleDecrement = () => {
    decrementQuantity(item.product._id);
  };

  const handleRemove = () => {
    removeFromCart(item.product._id);
  };

  return (
    <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 p-3">
      <div className="flex gap-3">
        <div className="flex-shrink-0">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-slate-50 to-blue-50 rounded-lg flex items-center justify-center">
            <img src={item.product.imageUrl} alt={item.product.name} className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-medium text-xs sm:text-sm text-gray-900 line-clamp-2 leading-tight">{item.product.name}</h3>
            <button onClick={handleRemove} className="flex-shrink-0 text-gray-400 hover:text-red-500 transition-colors duration-200 p-1">
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
          <div className="mt-1 space-y-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-sm sm:text-base font-bold text-gray-900">${discountedPrice.toFixed(2)}</span>
              {item.product.discount > 0 && <span className="text-xs text-gray-400 line-through">${item.product.price.toFixed(2)}</span>}
              {item.product.discount > 0 && (
                <span className="bg-gradient-to-r from-red-500 to-pink-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                  {item.product.discount}% OFF
                </span>
              )}
            </div>

            {item.product.discount > 0 && (
              <p className="text-green-600 text-xs font-medium flex items-center gap-1">
                <Zap className="w-3 h-3" />
                Save ${totalSaved.toFixed(2)}
              </p>
            )}
          </div>
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleDecrement}
                disabled={item.quantity <= 1}
                className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-100 rounded flex items-center justify-center text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <Minus className="w-2.5 h-2.5" />
              </button>

              <span className="w-6 text-center text-xs sm:text-sm font-medium text-gray-900">{item.quantity}</span>
              <button
                onClick={handleIncrement}
                className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-100 rounded flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors duration-200"
              >
                <Plus className="w-2.5 h-2.5" />
              </button>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-gray-900">${totalPrice.toFixed(2)}</p>
              <p className="text-[10px] sm:text-xs text-gray-500">
                {item.quantity} × ${discountedPrice.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
