import { Document, Types } from "mongoose";

interface ICartItem {
  _id: Types.ObjectId;
  product: Types.ObjectId;
  quantity: number;
}

export interface ICart extends Document {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  items: ICartItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CartResponse {
  user: string;
  items: {
    _id: string;
    quantity: number;
    product: {
      _id: string;
      name: string;
      price: number;
      discount: number;
      imageUrl: string;
    };
  }[];
}

export type LeanProduct = {
  _id: Types.ObjectId;
  name: string;
  price: number;
  discount: number;
  imageUrl: string;
};

export type LeanCartItem = {
  _id: Types.ObjectId;
  quantity: number;
  product: LeanProduct;
};

export type LeanCart = {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  items: LeanCartItem[];
};
