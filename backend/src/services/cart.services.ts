import { Types } from "mongoose";
import { Cart } from "../models/cart.models";
import { Product } from "../models/product.models";
import { AppError } from "../utils/app-error";
import { CartResponse } from "../types/cart.types";

const validateObjectId = (id: string) => Types.ObjectId.isValid(id);

export const addToCartService = async (productId: string, userId: string): Promise<CartResponse> => {
  const product = await Product.findById(productId).select("_id");
  if (!product) throw new AppError(404, "Product doesn't exist");

  let cart = await Cart.findOneAndUpdate(
    {
      user: userId,
      "items.product": productId,
    },
    { $inc: { "items.$.quantity": 1 } },
    { new: true }
  );

  if (cart) return { user: userId, items: cart.items };

  cart = await Cart.findOneAndUpdate(
    { user: userId },
    {
      $push: {
        items: {
          product: new Types.ObjectId(productId),
          quantity: 1,
        },
      },
      $setOnInsert: { user: userId },
    },
    { new: true, upsert: true }
  );

  return {
    user: userId,
    items: cart.items,
  };
};

export const incrementQuantityService = async (userId: string, productId: string): Promise<CartResponse> => {
  const updatedCart = await Cart.findOneAndUpdate(
    {
      user: userId,
      "items.product": productId,
    },
    { $inc: { "items.$.quantity": 1 } },
    { new: true }
  );
  return {
    user: userId,
    items: updatedCart?.items || [],
  };
};

export const decrementQuantityService = async (userId: string, productId: string): Promise<CartResponse> => {
  const updatedCart = await Cart.findOneAndUpdate(
    {
      user: userId,
      "items.product": productId,
    },
    { $inc: { "items.$.quantity": -1 } },
    { new: true }
  );

  if (!updatedCart) {
    throw new AppError(404, "Product not in cart");
  }

  await Cart.updateOne(
    {
      user: userId,
    },
    {
      $pull: {
        items: { quantity: { $lte: 0 } },
      },
    }
  );

  const refreshedCart = await Cart.findOne({ user: userId });

  return {
    user: userId,
    items: refreshedCart?.items || [],
  };
};

export const removeFromCartService = async (productId: string, userId: string): Promise<CartResponse> => {
  const cart = await Cart.findOneAndUpdate(
    {
      user: userId,
    },
    { $pull: { items: { product: productId } } },
    { new: true }
  );

  if (!cart) {
    throw new AppError(404, "Cart not found");
  }
  return {
    user: userId,
    items: cart?.items || [],
  };
};

export const clearCartService = async (userId: string): Promise<void> => {
  await Cart.deleteOne({ user: userId });
};

export const getMyCartService = async (userId: string): Promise<CartResponse> => {
  const cart = await Cart.findOne({ user: userId });
  return {
    user: userId,
    items: cart?.items || [],
  };
};
