import { da } from "zod/locales";
import { Category } from "../../models/category.models";
import { AddCategory, CategoryResponse, GetAllCategoriesResponse, GetCategoriesParams, UpdateCategory } from "../../types/admin/category.types";
import { ICategory } from "../../types/category.types";
import { AppError } from "../../utils/app-error";
import mongoose, { Types } from "mongoose";
import { Product } from "../../models/product.models";

const validateObjectId = (id: string) => Types.ObjectId.isValid(id);

//Service to get all categories with pagination and search filter
export const getAllCategoriesService = async (params: GetCategoriesParams): Promise<GetAllCategoriesResponse> => {
  const { page = 1, limit = 10, search } = params;
  const skip = page > 0 ? (page - 1) * limit : 0;
  const query: any = {};
  if (search) {
    query.name = { $regex: search, $options: "i" }; //i means case insensitive
    query.description = { $regex: search, $options: "i" };
    query.slug = { $regex: search, $options: "i" };
  }
  const categories = await Category.find(query).skip(skip).limit(limit);
  const mappedCategories = categories.map(toCategoryResponse);
  const totalPages = await Category.countDocuments(query);
  return {
    categories: mappedCategories,
    page,
    limit,
    total: Math.ceil(totalPages / limit),
  };
};

//Service to get a particular category by id
export const getCategoryByIdService = async (categoryId: string): Promise<CategoryResponse> => {
  if (!validateObjectId(categoryId)) {
    throw new AppError(400, "Invalid category ID");
  }
  const category = await Category.findById(categoryId);
  if (!category) {
    throw new AppError(404, "Category not found");
  }
  return toCategoryResponse(category);
};

//Service to add a new category
export const addCategoryService = async (data: AddCategory): Promise<CategoryResponse> => {
  const existingCategory = await Category.findOne({
    $or: [{ name: data.name }, { slug: data.slug }],
  });
  if (existingCategory) {
    throw new AppError(409, "Category with this name or slug already exists");
  }
  const category = await Category.create(data);
  return toCategoryResponse(category);
};

//Service to update a category
export const updateCategoryService = async (categoryId: string, data: UpdateCategory): Promise<CategoryResponse> => {
  if (!validateObjectId(categoryId)) {
    throw new AppError(400, "Invalid category ID");
  }
  const category = await Category.findById(categoryId);
  if (!category) {
    throw new AppError(404, "Category not found");
  }
  if (data.name !== undefined) category.name = data.name;
  if (data.slug !== undefined) category.slug = data.slug;
  if (data.description !== undefined) category.description = data.description;
  await category.save();
  return toCategoryResponse(category);
};

//Service to delete a category
export const deleteCategoryService = async (categoryId: string): Promise<void> => {
  if (!validateObjectId(categoryId)) {
    throw new AppError(400, "Invalid category ID");
  }
  const category = await Category.findById(categoryId);
  if (!category) {
    throw new AppError(404, "Category not found");
  }
  //Delete all products associated with this category
  // Start a session for transaction to ensure atomicity (either all or nothing) according to ACID principles
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    await Promise.all([Product.deleteMany({ category: categoryId }).session(session), Category.findByIdAndDelete(categoryId).session(session)]);

    await session.commitTransaction();
  } catch (err:any) {
    await session.abortTransaction();
  } finally {
    session.endSession();
  }
};

//Helper function to convert category schema to CategoryResponse
const toCategoryResponse = (category: ICategory): CategoryResponse => {
  return {
    _id: category._id.toString(),
    name: category.name,
    slug: category.slug,
    description: category.description,
    totalProducts: category.totalProducts,
    createdAt: category.createdAt,
    updatedAt: category.updatedAt,
  };
};
