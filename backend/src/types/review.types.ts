import { Document, Types } from "mongoose";
import z from "zod";
import { createReviewSchema, updateReviewSchema } from "../validators/review.validators";

//Review model tyoe defination
export interface IReview extends Document {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  product: Types.ObjectId;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}
export type CreateReview = z.infer<typeof createReviewSchema>;
export type UpdateReview = z.infer<typeof updateReviewSchema>;

export interface ReviewResponse {
  _id: string;
  user: {
    _id: string;
    name: string;
    imageUrl?: string | null;
  };
  product: string;
  rating: number;
  comment?: string;
  createdAt: Date;
  updatedAt: Date;
}
