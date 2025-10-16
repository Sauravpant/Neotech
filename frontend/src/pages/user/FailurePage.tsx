import { useNavigate } from "react-router-dom";
import { XCircle, RefreshCw, ShoppingBag, Home } from "lucide-react";

const OrderFailurePage = () => {
  const navigate = useNavigate();

  const handleRetry = () => {
    navigate("/cart");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-50/30 py-6 sm:py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-6 sm:p-8 text-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <XCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>

          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">Order Failed</h1>

          <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 max-w-md mx-auto">
            We encountered an issue while processing your order. Please try again or contact support if the problem persists.
          </p>

          <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border border-red-100">
            <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-xs sm:text-sm font-medium text-red-700">Payment Declined</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600">This could be due to insufficient funds, card issues, or technical problems.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <button
              onClick={handleRetry}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-sm sm:text-base"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>

            <button
              onClick={() => navigate("/products")}
              className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 font-medium px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:bg-gray-200 transition-all duration-300 text-sm sm:text-base"
            >
              <ShoppingBag className="w-4 h-4" />
              Continue Shopping
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

        <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-2">
              <span className="text-blue-600 text-sm sm:text-base">💳</span>
            </div>
            <h3 className="font-medium text-gray-900 text-xs sm:text-sm mb-1">Check Payment Method</h3>
            <p className="text-gray-600 text-[10px] sm:text-xs">Verify card details and funds</p>
          </div>

          <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-50 rounded-lg flex items-center justify-center mx-auto mb-2">
              <span className="text-red-600 text-sm sm:text-base">📞</span>
            </div>
            <h3 className="font-medium text-gray-900 text-xs sm:text-sm mb-1">Contact Support</h3>
            <p className="text-gray-600 text-[10px] sm:text-xs">We're here to help you</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderFailurePage;
