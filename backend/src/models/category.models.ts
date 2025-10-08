import { Schema, model } from "mongoose";
import { ICategory } from "../types/category.types";

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      unique:true,
    },
    slug: {
      type: String,
      required: true,
      unique:true,
    },
    description: {
      type: String,
      required: true,
    },
    totalProducts: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Category = model<ICategory>("Category", categorySchema);
