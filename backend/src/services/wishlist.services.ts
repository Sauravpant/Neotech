import { Wishlist } from "../models/wishlist.models";
import { AppError } from "../utils/app-error";
import { WishlistResponse } from "../types/wishlist.types";
import { IProduct } from "../types/product.types";
import { Product } from "../models/product.models";
import { Types } from "mongoose";

const validateObjectId = (id: string) => Types.ObjectId.isValid(id);

export const addToWishlistService = async (userId: string, productId: string): Promise<WishlistResponse> => {
  if (!validateObjectId(userId) || !validateObjectId(productId)) {
    throw new AppError(400, "Invalid id");
  }
  const product = await Product.findById(productId).select("_id name price imageUrl");
  if (!product) {
    throw new AppError(404, "Product does not exist");
  }

  const wishlist = await Wishlist.findOneAndUpdate(
    {
      user: userId,
    },
    { $addToSet: { products: productId } },
    { new: true, upsert: true }
  ).populate<{ products: IProduct[] }>("products", "_id name price discount imageUrl countInStock");

  return {
    user: userId,
    products:
      wishlist?.products.map((p) => ({
        _id: p._id.toString(),
        name: p.name,
        price: p.price,
        imageUrl: p.imageUrl || null,
        countInStock: p.countInStock,
        discount: p.discount,
      })) || [],
  };
};

export const removeFromWishlistService = async (userId: string, productId: string): Promise<WishlistResponse> => {
  if (!validateObjectId(userId) || !validateObjectId(productId)) {
    throw new AppError(400, "Invalid id");
  }
  const wishlist = await Wishlist.findOneAndUpdate(
    { user: userId },
    {
      $pull: { products: productId },
    },
    { new: true }
  ).populate<{ products: IProduct[] }>("products", "_id name price discount imageUrl countInStock");

  return {
    user: userId,
    products:
      wishlist?.products.map((p) => ({
        _id: p._id.toString(),
        name: p.name,
        price: p.price,
        imageUrl: p.imageUrl || null,
        countInStock: p.countInStock,
        discount: p.discount,
      })) || [],
  };
};

export const getMyWishlistService = async (userId: string): Promise<WishlistResponse> => {
  if (!validateObjectId(userId)) {
    throw new AppError(400, "Invalid id");
  }
  const wishlist = await Wishlist.findOne({
    user: userId,
  }).populate<{ products: IProduct[] }>("products", "_id name price discount imageUrl countInStock");

  return {
    user: userId,
    products:
      wishlist?.products.map((p) => ({
        _id: p._id.toString(),
        name: p.name,
        price: p.price,
        imageUrl: p.imageUrl || null,
        countInStock: p.countInStock,
        discount: p.discount,
      })) || [],
  };
};

export const clearWishlistService = async (userId: string): Promise<void> => {
  if (!validateObjectId(userId)) {
    throw new AppError(400, "Invalid id");
  }
  await Wishlist.deleteOne({ user: userId });
};
