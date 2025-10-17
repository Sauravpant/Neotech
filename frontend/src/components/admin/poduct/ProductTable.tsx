import type { GetAllProductsResponse } from "@/types/common/product.types";
import UpdateProductCard from "./UpdateProductCard";
import { useDeleteProduct } from "@/hooks/admin/useAdminProducts";
import { AlertBox } from "@/components/common/AlertBox";
import ProductDetailsCard from "./ProductDetails";

interface ProductsTableProps {
  products: GetAllProductsResponse["products"];
}

export const ProductsTable: React.FC<ProductsTableProps> = ({ products }) => {
  const { mutate: deleteProduct } = useDeleteProduct();
  const handleDelete = (productId: string) => {
    deleteProduct(productId);
  };
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-xs uppercase">SN</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-xs uppercase">Product</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-xs uppercase">Stock</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-xs uppercase">Category</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-xs uppercase">Price</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-xs uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product, index) => (
              <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4 font-medium text-gray-900 text-sm">{index + 1}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <img src={product.imageUrl} alt={product.name} className="w-10 h-10 rounded-lg object-cover border border-gray-200" />
                    <div>
                      <div className="font-medium text-gray-900 text-sm">{product.name}</div>
                      <div className="text-gray-500 text-xs truncate max-w-[200px]">{product.description}</div>
                    </div>
                  </div>
                </td>

                <td className="py-3 px-4">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      product.countInStock > 10
                        ? "bg-green-50 text-green-700"
                        : product.countInStock > 0
                        ? "bg-yellow-50 text-yellow-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {product.countInStock} in stock
                  </span>
                </td>

                <td className="py-3 px-4">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                    {product.category.name}
                  </span>
                </td>

                <td className="py-3 px-4">
                  <div className="text-gray-900 text-sm font-medium">${product.price}</div>
                  {product.discount && <div className="text-green-600 text-xs">${(product.price - product.discount).toFixed(2)} after discount</div>}
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <ProductDetailsCard productId={product._id} />
                    <UpdateProductCard productId={product._id} />
                    <AlertBox
                      className="bg-red-500 hover:bg-red-600 text-xs text-white px-3 py-1 rounded-lg"
                      button="Delete"
                      question="Are you sure you want to delete this product?"
                      description="This action will remove all the details related to this product"
                      confirmButton="Delete"
                      cancelButton="Cancel"
                      onSubmit={handleDelete}
                      id={product._id}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
