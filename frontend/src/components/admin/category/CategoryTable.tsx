import { formatDate } from "@/lib/helpers";
import type { CategoryResponse } from "@/types/admin/category.types";
import UpdateCategoryCard from "./UpdateCategoryCard";
import { AlertBox } from "@/components/common/AlertBox";
import { useDeleteCategory } from "@/hooks/admin/useAdminCategories";

interface CategoriesTableProps {
  categories: CategoryResponse[];
}

export const CategoriesTable: React.FC<CategoriesTableProps> = ({ categories }) => {
  const { mutate: deleteCategory } = useDeleteCategory();
  const handleDelete = (id: string) => {
    deleteCategory(id);
  };
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-xs uppercase">SN</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-xs uppercase">Name</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-xs uppercase">Slug</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-xs uppercase">Description</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-xs uppercase">Products</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-xs uppercase">Created</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-xs uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {categories.map((category, index) => (
              <tr key={category._id} className="hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4 text-gray-600 text-sm">{index + 1}</td>
                <td className="py-3 px-4">
                  <div className="font-medium text-gray-900 text-sm">{category.name}</div>
                </td>
                <td className="py-3 px-4">
                  <div className="text-gray-600 text-sm">{category.slug}</div>
                </td>
                <td className="py-3 px-4">
                  <div className="text-gray-600 text-sm max-w-[200px] truncate" title={category.description}>
                    {category.description}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                    {category.totalProducts} products
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-600 text-sm">{formatDate(category.createdAt)}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <UpdateCategoryCard categoryId={category._id} />
                    <AlertBox
                      className="bg-red-500 hover:bg-red-600 text-xs text-white px-3 py-1 rounded-lg"
                      button="Delete"
                      question="Are you sure you want to delete this category?"
                      description="This action will remove all the category details"
                      confirmButton="Delete"
                      cancelButton="Cancel"
                      onSubmit={handleDelete}
                      id={category._id}
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
