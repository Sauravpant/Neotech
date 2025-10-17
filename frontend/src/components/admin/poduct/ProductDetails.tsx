import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Star, Package, Tag, Layers, DollarSign, Users, Eye } from "lucide-react";
import { useGetProductById } from "@/hooks/admin/useAdminProducts";
import type { ProductByIdResponse } from "@/types/common/product.types";

interface ProductDetailsDialogProps {
  productId: string;
}

const ProductDetailsCard: React.FC<ProductDetailsDialogProps> = ({ productId }) => {
  const { data, isLoading } = useGetProductById(productId);
  const product: ProductByIdResponse | undefined = data?.data;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors">
          <Eye className="h-3 w-3" />
          View
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-3xl w-[95vw] sm:w-full rounded-2xl overflow-hidden p-0">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500 animate-pulse">Loading product...</p>
          </div>
        ) : product ? (
          <div className="flex flex-col sm:flex-row">
            <div className="sm:w-1/2 bg-gray-50 flex items-center justify-center p-4 sm:p-6">
              <img src={product.imageUrl} alt={product.name} className="w-full max-w-sm rounded-xl object-cover shadow-sm" />
            </div>
            <ScrollArea className="sm:w-1/2 max-h-[80vh] p-4 sm:p-6">
              <DialogHeader>
                <DialogTitle className="text-xl sm:text-2xl font-semibold text-gray-900">{product.name}</DialogTitle>
                <DialogDescription className="text-sm text-gray-500">{product.category?.name || "Uncategorized"}</DialogDescription>
              </DialogHeader>

              <div className="mt-4 space-y-4 text-sm sm:text-base">
                <div className="text-gray-700 leading-relaxed">{product.description}</div>

                <div className="flex flex-wrap gap-4 mt-3 text-gray-700">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span className="font-semibold">${product.price.toFixed(2)}</span>
                  </div>

                  {product.discount > 0 && (
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-amber-500" />
                      <span>{product.discount}% off</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-blue-500" />
                    <span>{product.countInStock} in stock</span>
                  </div>
                </div>

                {product.category && (
                  <div className="pt-3 border-t text-gray-600">
                    <h3 className="font-medium text-gray-800 flex items-center gap-2 mb-1">
                      <Package className="w-4 h-4 text-gray-500" /> Category
                    </h3>
                    <p className="text-sm">{product.category.description}</p>
                  </div>
                )}

                {/* Ratings */}
                <div className="flex items-center gap-2 mt-4">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="font-semibold">{product.avgRating?.toFixed(1) || "0.0"}</span>
                  <span className="text-gray-500 text-sm">({product.totalReviews} reviews)</span>
                </div>

                {/* Reviews */}
                <div className="mt-5">
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-500" /> Recent Reviews
                  </h3>
                  <div className="space-y-3">
                    {product.reviews.length > 0 ? (
                      product.reviews.slice(0, 3).map((r) => (
                        <div key={r._id} className="p-3 border rounded-xl bg-gray-50 hover:bg-gray-100 transition">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <img
                                src={r.user.imageUrl || "https://via.placeholder.com/40"}
                                alt={r.user.name}
                                className="w-8 h-8 rounded-full object-cover"
                              />
                              <div>
                                <p className="text-sm font-medium text-gray-800">{r.user.name}</p>
                                <div className="flex items-center gap-1 text-yellow-500 text-xs">
                                  {Array.from({ length: r.rating }).map((_, i) => (
                                    <Star key={i} className="w-3 h-3 fill-current" />
                                  ))}
                                </div>
                              </div>
                            </div>
                            <p className="text-xs text-gray-500">{new Date(r.createdAt).toLocaleDateString()}</p>
                          </div>
                          {r.comment && <p className="mt-2 text-gray-600 text-sm leading-relaxed">{r.comment}</p>}
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm">No reviews yet.</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <DialogClose asChild>
                  <Button variant="outline">Close</Button>
                </DialogClose>
              </div>
            </ScrollArea>
          </div>
        ) : (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500">Product not found.</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsCard;
