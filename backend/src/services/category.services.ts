import { Category } from "../models/category.models";
import { CategoryResponse } from "../types/admin/category.types";
import { ICategory } from "../types/category.types";

export const getAllCategoriesService = async (): Promise<CategoryResponse[]> => {
  const categories = await Category.find().lean();
  const result = categories.map((category) => ({
    _id: category._id.toString(),
    name: category.name,
    slug: category.slug,
    description: category.description,
    totalProducts: category.totalProducts,
    createdAt: category.createdAt,
    updatedAt: category.updatedAt,
  }));
  return result;
};
