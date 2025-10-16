import React from "react";
import type { GetAllProductsResponse } from "@/types/common/product.types";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { EmptyResult } from "@/components/ui/EmptyMessage";
import { ShoppingCart, Tag, CheckCircle, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAddToCart } from "@/hooks/user/useCart";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

interface ProductsGridProps {
  products?: GetAllProductsResponse["products"];
  isLoading?: boolean;
  error?: unknown;
  refetch: () => void;
}

const ProductsGrid: React.FC<ProductsGridProps> = ({ products, isLoading, error, refetch }) => {
  const navigate = useNavigate();
  const { mutate } = useAddToCart();

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const handleAddToCart = (productId: string) => {
    if (isAuthenticated) {
      mutate(productId);
    } else {
      navigate("/auth/login", { replace: true });
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="animate-pulse bg-gradient-to-br from-gray-200 to-gray-100 rounded-3xl h-72 sm:h-80" />
        ))}
      </div>
    );
  }

  if (error) {
    return <ErrorMessage title="Failed to load products" refetch={refetch} />;
  }

  if (!products || products.length === 0) {
    return <EmptyResult title="No Products Found" subtitle="Please check back later." />;
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-5">
      {products.map((product) => (
        <div
          key={product._id}
          className="group bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 border border-gray-100 overflow-hidden flex flex-col relative"
        >
          <div
            onClick={() => navigate(`/product/${product._id}`)}
            className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
          />
          {product.discount && (
            <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-20">
              <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1.5 rounded-2xl shadow-lg flex items-center gap-1.5 backdrop-blur-sm">
                <Tag className="w-3 h-3" />
                {product.discount}% OFF
              </div>
            </div>
          )}
          <div
            className="relative w-full h-36 sm:h-44 md:h-52 bg-gradient-to-br from-slate-50 via-white to-blue-50/50 overflow-hidden flex items-center justify-center cursor-pointer rounded-t-3xl"
            onClick={() => navigate(`/product/${product._id}`)}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/10" />
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-4/5 h-4/5 object-contain transition-all duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </div>
          <div className="p-3 sm:p-4 md:p-5 flex flex-col flex-1 justify-between relative z-10 bg-white/80 backdrop-blur-sm">
            <div className="space-y-2 sm:space-y-3">
              <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between xl:gap-3">
                <h2
                  className="font-semibold text-sm sm:text-base text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300 cursor-pointer leading-snug"
                  onClick={() => navigate(`/product/${product._id}`)}
                >
                  {product.name}
                </h2>
                {product.category?.name && (
                  <div className="hidden xl:block bg-blue-100 text-blue-700 text-[10px] font-medium px-2 py-1 rounded-lg whitespace-nowrap flex-shrink-0 mt-1 xl:mt-0">
                    {product.category.name}
                  </div>
                )}
              </div>

              <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 leading-relaxed">{product.description}</p>
            </div>

            <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className=" font-bold text-sm text-red-500 sm:text-lg">$ {(Number(product.price) * (1 - Number(product.discount) / 100)).toFixed(2)}</span>
                  </div>
                  {product.discount && <span className="block text-gray-400 text-xs sm:text-sm line-through font-medium">$ {product.price}</span>}
                </div>

                <div
                  className={`flex items-center gap-1.5 px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-2xl text-[10px] sm:text-xs font-semibold ${
                    product.countInStock > 0
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-amber-50 text-amber-700 border border-amber-200"
                  }`}
                >
                  {product.countInStock > 0 ? (
                    <>
                      <CheckCircle className="w-3 h-3" />
                      In Stock
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
            <button
              onClick={() => handleAddToCart(product._id)}
              disabled={product.countInStock === 0}
              className={`mt-3 sm:mt-4 w-full flex items-center justify-center gap-2 py-2.5 sm:py-3 rounded-2xl font-semibold text-xs sm:text-sm transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                product.countInStock > 0
                  ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/40 active:bg-blue-800 active:scale-95 transform hover:-translate-y-0.5 active:translate-y-0"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <ShoppingCart className={`w-4 h-4 ${product.countInStock > 0 ? "group-hover:scale-110" : ""}`} />
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsGrid;
