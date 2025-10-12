import { Types } from "mongoose";
import { Cart } from "../models/cart.models";
import { Product } from "../models/product.models";
import { AppError } from "../utils/app-error";
import { CartResponse, LeanCart } from "../types/cart.types";

export const addToCartService = async (productId: string, userId: string): Promise<CartResponse> => {
  const product = await Product.findById(productId).select("_id");
  if (!product) {
    throw new AppError(404, "Product doesn't exist");
  }

  let cart = await Cart.findOneAndUpdate({ user: userId, "items.product": productId }, { $inc: { "items.$.quantity": 1 } }, { new: true })
    .populate("items.product", "name price discount imageUrl")
    .lean<LeanCart>();

  if (cart) return toCartResponse(userId, cart);

  cart = await Cart.findOneAndUpdate(
    { user: userId },
    {
      $push: { items: { product: new Types.ObjectId(productId), quantity: 1 } },
      $setOnInsert: { user: userId },
    },
    { new: true, upsert: true }
  )
    .populate("items.product", "name price discount imageUrl")
    .lean<LeanCart>();

  return toCartResponse(userId, cart);
};

export const incrementQuantityService = async (userId: string, productId: string): Promise<CartResponse> => {
  const updatedCart = await Cart.findOneAndUpdate({ user: userId, "items.product": productId }, { $inc: { "items.$.quantity": 1 } }, { new: true })
    .populate("items.product", "name price discount imageUrl")
    .lean<LeanCart>();

  return toCartResponse(userId, updatedCart);
};

export const decrementQuantityService = async (userId: string, productId: string): Promise<CartResponse> => {
  const updatedCart = await Cart.findOneAndUpdate(
    { user: userId, "items.product": productId },
    { $inc: { "items.$.quantity": -1 } },
    { new: true }
  ).lean<LeanCart>();

  if (!updatedCart) {
    throw new AppError(404, "Product not in cart");
  }

  await Cart.updateOne(
    { user: userId },
    {
      $pull: { items: { quantity: { $lte: 0 } } },
    }
  );

  const refreshedCart = await Cart.findOne({
    user: userId,
  })
    .populate("items.product", "name price discount imageUrl")
    .lean<LeanCart>();

  return toCartResponse(userId, refreshedCart);
};

export const removeFromCartService = async (productId: string, userId: string): Promise<CartResponse> => {
  const cart = await Cart.findOneAndUpdate({ user: userId }, { $pull: { items: { product: productId } } }, { new: true })
    .populate("items.product", "name price discount imageUrl")
    .lean<LeanCart>();

  if (!cart) {
    throw new AppError(404, "Cart not found");
  }

  return toCartResponse(userId, cart);
};

export const clearCartService = async (userId: string): Promise<void> => {
  await Cart.deleteOne({ user: userId });
};

export const getMyCartService = async (userId: string): Promise<CartResponse> => {
  const cart = await Cart.findOne({
    user: userId,
  })
    .populate("items.product", "name price discount imageUrl")
    .lean<LeanCart>();
  return toCartResponse(userId, cart);
};

// Helper function to convert Cart to CartResponse
const toCartResponse = (userId: string, cart: LeanCart | null): CartResponse => ({
  user: userId,
  items:
    cart?.items.map((item) => ({
      _id: item._id.toString(),
      quantity: item.quantity,
      product: {
        _id: item.product._id.toString(),
        name: item.product.name,
        price: item.product.price,
        discount: item.product.discount,
        imageUrl: item.product.imageUrl,
      },
    })) || [],
});
