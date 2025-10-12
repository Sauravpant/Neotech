import mongoose, { Schema } from "mongoose";
import { IWishlist } from "../types/wishlist.types";

const wishlistSchema = new Schema<IWishlist>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

export const Wishlist = mongoose.model<IWishlist>("Wishlist", wishlistSchema);
