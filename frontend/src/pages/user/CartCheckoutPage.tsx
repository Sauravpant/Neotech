import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { useGetMyCart } from "@/hooks/user/useCart";
import CartHeader from "@/components/user/cart/CartHeader";
import CartCard from "@/components/user/cart/CartCard";
import Checkout from "@/components/user/cart/Checkout";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, ArrowRight } from "lucide-react";

const CartCheckoutPage = () => {
  const { data: cart, isLoading: cartLoading, isError: cartError, refetch: cartRefetch } = useGetMyCart();
  const navigate = useNavigate();
  const cartItems = cart?.data?.items || [];

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  if (cartLoading) {
    return <LoadingScreen title="Loading cart" subtitle="Loading your cart items" />;
  }

  if (cartError) {
    return <ErrorMessage title="Failed to fetch the cart items" refetch={cartRefetch} />;
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50/30 py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center">
            <div className="w-15 lg:w-20 h-15 md:w-24 md:h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            </div>
            <h1 className="text-xl  md:text-2xl xl:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">Your cart is empty</h1>
            <p className="text-sm sm:text-base text-gray-600 mb-8 max-w-md mx-auto">
              Discover amazing products and add them to your cart to get started with your shopping journey.
            </p>
            <button
              onClick={() => navigate("/products")}
              className="inline-flex items-center gap-2  cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold semibold px-5 md:px-6 py-3 md:py-4 rounded-xl hover:shadow-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              Explore Products
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50/30 py-4 sm:py-6">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 max-w-6xl">
        <CartHeader itemCount={cartItems.length} totalItems={totalItems} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">
            {cartItems.map((item) => (
              <CartCard key={item._id} item={item} />
            ))}
          </div>
          <div className="lg:col-span-1">
            <Checkout cartItems={cartItems} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCheckoutPage;
