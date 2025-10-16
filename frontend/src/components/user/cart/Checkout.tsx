import React, { useState } from "react";
import { CreditCard, Truck, MapPin, Shield, Loader, Zap } from "lucide-react";
import { useCreateOrder } from "@/hooks/user/useOrders";
import type { CartResponse } from "@/types/user/cart.types";

interface CheckoutProps {
  cartItems: CartResponse["items"];
}
const Checkout: React.FC<CheckoutProps> = ({ cartItems }) => {
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "Stripe">("COD");

  const { mutate: createOrder, isPending } = useCreateOrder();

  const subtotal = cartItems.reduce((total, item) => {
    const discountedPrice = item.product.discount > 0 ? item.product.price * (1 - item.product.discount / 100) : item.product.price;
    return total + discountedPrice * item.quantity;
  }, 0);

  const shippingFee = 0;
  const tax = 0;
  const total = subtotal + shippingFee + tax;

  const totalSaved = cartItems.reduce((saved, item) => {
    if (item.product.discount > 0) {
      const originalTotal = item.product.price * item.quantity;
      const discountedTotal = item.product.price * (1 - item.product.discount / 100) * item.quantity;
      return saved + (originalTotal - discountedTotal);
    }
    return saved;
  }, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingAddress.trim()) return;
    createOrder({ shippingAddress, paymentMethod });
  };

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-5 sticky top-4">
      <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
        <Zap className="w-5 h-5 text-blue-600" />
        Checkout Summary
      </h2>

      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        <div>
          <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
            <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
            Shipping Address
          </label>
          <textarea
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            placeholder="Enter your complete shipping address..."
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none text-xs sm:text-sm"
            required
          />
        </div>
        <div>
          <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-700 mb-2">
            <CreditCard className="w-3 h-3 sm:w-4 sm:h-4" />
            Payment Method
          </label>
          <div className="space-y-2">
            <label className="flex items-center gap-2 p-2.5 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-200">
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={paymentMethod === "COD"}
                onChange={() => setPaymentMethod("COD")}
                className="text-blue-600 focus:ring-blue-500"
              />
              <Truck className="w-4 h-4 text-gray-600" />
              <div>
                <p className="font-medium text-gray-900 text-xs sm:text-sm">Cash on Delivery</p>
                <p className="text-[10px] sm:text-xs text-gray-600">Pay when you receive</p>
              </div>
            </label>

            <label className="flex items-center gap-2 p-2.5 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-200">
              <input
                type="radio"
                name="paymentMethod"
                value="stripe"
                checked={paymentMethod === "Stripe"}
                onChange={() => setPaymentMethod("Stripe")}
                className="text-blue-600 focus:ring-blue-500"
              />
              <Shield className="w-4 h-4 text-gray-600" />
              <div>
                <p className="font-medium text-gray-900 text-xs sm:text-sm">Credit/Debit Card</p>
                <p className="text-[10px] sm:text-xs text-gray-600">Secure payment via Stripe</p>
              </div>
            </label>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-3 sm:pt-4">
          <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Order Summary</h3>
          <div className="space-y-1.5 text-xs sm:text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium text-green-600">Free</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax</span>
              <span className="font-medium">${tax.toFixed(2)}</span>
            </div>
            {totalSaved > 0 && (
              <div className="flex justify-between text-green-600">
                <span>You Save</span>
                <span className="font-medium">-${totalSaved.toFixed(2)}</span>
              </div>
            )}
            <div className="border-t border-gray-200 pt-2">
              <div className="flex justify-between font-bold text-sm sm:text-base">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
        <button
          type="submit"
          disabled={isPending || !shippingAddress.trim()}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-2.5 rounded-lg hover:shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 text-sm"
        >
          {isPending ? <Loader className="animate-spin h-4 w-4 mx-auto" /> : `Place Order - $${total.toFixed(2)}`}
        </button>
        <div className="text-center">
          <p className="text-[10px] text-gray-500 flex items-center justify-center gap-1">
            <Shield className="w-3 h-3" />
            Secure and encrypted payment
          </p>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
