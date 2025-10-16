import { useNavigate } from "react-router-dom";
import { CheckCircle, ShoppingBag, ArrowRight, Home } from "lucide-react";

const OrderSuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen  py-6 sm:py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-6 sm:p-8 text-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20  rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>

          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">Order Confirmed!</h1>

          <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 max-w-md mx-auto">
            Thank you for your purchase! Your order has been successfully placed and is being processed.
          </p>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border border-green-100">
            <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs sm:text-sm font-medium text-green-700">Order Processing</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600">You will receive a confirmation email with order details shortly.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <button
              onClick={() => navigate("/products")}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-sm sm:text-base"
            >
              <ShoppingBag className="w-4 h-4" />
              Continue Shopping
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigate("/")}
              className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 font-medium px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:bg-gray-200 transition-all duration-300 text-sm sm:text-base"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
