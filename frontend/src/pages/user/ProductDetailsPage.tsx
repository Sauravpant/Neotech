import { EmptyResult } from "@/components/ui/EmptyMessage";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { useGetProductById } from "@/hooks/user/useProducts";
import { useNavigate, useParams } from "react-router-dom";
import ProductHero from "@/components/user/product/ProductHero";
import ProductReviews from "@/components/user/product/ProductReviews";
import { useAddToCart } from "@/hooks/user/useCart";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { Truck, Shield, RotateCcw } from "lucide-react";

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, error, refetch } = useGetProductById(id!);
  const { mutate: addToCart } = useAddToCart();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  if (isLoading) {
    return <LoadingScreen title="Loading product details" subtitle="View all the details of the product" />;
  }
  if (error) {
    return <ErrorMessage title="Failed to load product details" refetch={refetch} />;
  }

  const productDetails = data?.data;

  if (!productDetails) {
    return <EmptyResult title="Product not found" subtitle={data?.message} />;
  }

  const handleAddToCart = (productId: string) => {
    if (isAuthenticated) {
      addToCart(productId);
    } else {
      navigate("/auth/login");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="mb-12 sm:mb-16">
          <ProductHero product={productDetails} onAddToCart={handleAddToCart} />
        </div>
        <div className="mb-8">
          <ProductReviews product={productDetails} isAuthenticated={isAuthenticated} />
        </div>
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-6 sm:p-8 text-center">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">Why Shop With Us?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            <div className="space-y-3 sm:space-y-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto border border-green-100">
                <Truck className="w-6 h-6 sm:w-7 sm:h-7 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 text-sm sm:text-base lg:text-lg">Free Shipping</h4>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">Free delivery on all orders over $50</p>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto border border-blue-100">
                <Shield className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 text-sm sm:text-base lg:text-lg">2-Year Warranty</h4>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">Comprehensive protection for your device</p>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto border border-orange-100">
                <RotateCcw className="w-6 h-6 sm:w-7 sm:h-7 text-orange-600" />
              </div>
              <h4 className="font-semibold text-gray-900 text-sm sm:text-base lg:text-lg">Easy Returns</h4>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">30-day money-back guarantee</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
