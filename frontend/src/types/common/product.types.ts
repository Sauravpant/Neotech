export interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  discount: number;
  imageUrl: string;
  imagePublicId: string;
  countInStock: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetAllProductsResponse {
  products: {
    _id: string;
    name: string;
    imageUrl: string;
    description: string;
    countInStock: number;
    category: {
      _id: string;
      name: string;
    };
    price: number;
    discount?: number;
  }[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ProductByIdResponse {
  _id: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  imageUrl: string;
  countInStock: number;
  category: {
    _id: string;
    name: string;
    description: string;
  } | null;
  avgRating: number | null;
  totalReviews: number;
  reviews: {
    _id: string;
    rating: number;
    comment: string;
    createdAt: Date;
    updatedAt: Date;
    user: {
      _id: string;
      name: string;
      imageUrl: string | null;
    };
  }[];
}

export interface ProductParams {
  category?: string;
  name?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "latest" | "oldest" | "priceAsc" | "priceDesc";
  page?: number;
  limit?: number;
}
