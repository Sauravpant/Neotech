import z from "zod";
import { addCategorySchema, getCategoriesParamsSchema, updateCategorySchema } from "../../validators/admin/category.validators";

export type AddCategory = z.infer<typeof addCategorySchema>;
export type UpdateCategory = z.infer<typeof updateCategorySchema>;
export type GetCategoriesParams = z.infer<typeof getCategoriesParamsSchema>;

export interface CategoryResponse {
  _id: string;
  name: string;
  slug: string;
  description: string;
  totalProducts: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetAllCategoriesResponse {
  categories: CategoryResponse[];
  page: number;
  limit: number;
  total: number;
}