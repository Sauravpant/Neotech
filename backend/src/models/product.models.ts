import mongoose, { Schema, Model } from "mongoose";
import type { IProduct } from "../types/product.types";

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    imagePublicId: {
      type: String,
      required: true,
    },
    countInStock: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Product: Model<IProduct> = mongoose.model<IProduct>("Product", productSchema);
