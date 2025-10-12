import { Types } from "mongoose";

export interface IWishlist {
  user: Types.ObjectId;
  products: Types.ObjectId[];
}

export interface WishlistResponse {
  user: string;
  products: {
    _id: string;
    name: string;
    imageUrl: string | null;
    price: number;
    discount?: number;
    countInStock?: number;
  }[];
}
