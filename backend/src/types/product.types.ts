import { Document, Types } from "mongoose";
import z from "zod";
import { productParams } from "../validators/product.validators";

export interface IProduct extends Document {
  _id: Types.ObjectId;
  name: string;
  description: string;
  price: number;
  category: Types.ObjectId;
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
export type ProductParams = z.infer<typeof productParams>;
