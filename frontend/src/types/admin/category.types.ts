export interface AddCategory {
  name: string;
  slug: string;
  description: string;
}

export interface UpdateCategory {
  name?: string;
  slug?: string;
  description?: string;
}

export interface GetCategoriesParams {
  page?: number;
  limit?: number;
  search?: string;
}

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
