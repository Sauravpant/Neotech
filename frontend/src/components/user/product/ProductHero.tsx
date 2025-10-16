import React from "react";
import type { ProductByIdResponse } from "@/types/common/product.types";
import ProductInfo from "./ProductInfo";

interface ProductHeroProps {
  product: ProductByIdResponse;
  onAddToCart: (productId: string) => void;
}

const ProductHero: React.FC<ProductHeroProps> = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 p-4 sm:p-6 lg:p-8">
        <div className="flex items-center justify-center order-2 lg:order-1">
          <div className="relative w-full max-w-md">
            <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50/50 rounded-2xl p-6 sm:p-8 lg:p-12 shadow-inner">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-auto object-contain transition-transform duration-500 hover:scale-105"
              />
            </div>
            {product.discount > 0 && (
              <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs sm:text-sm font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl shadow-lg">
                {product.discount}% OFF
              </div>
            )}

            {product.countInStock > 0 && product.countInStock < 10 && (
              <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs sm:text-sm font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl shadow-lg">
                Only {product.countInStock} left!
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col justify-center order-1 lg:order-2">
          <ProductInfo product={product} onAddToCart={onAddToCart} />
        </div>
      </div>
    </div>
  );
};

export default ProductHero;
