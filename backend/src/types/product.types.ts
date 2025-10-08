import { Document, Types } from "mongoose";

export interface IProduct extends Document {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: Types.ObjectId;
  discount: number;
  imageUrl: string;
  imagePublicId: string;
  ratings: number;
  countInStock: number;
}
