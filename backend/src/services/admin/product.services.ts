import mongoose from "mongoose";
import { AddProduct, ProductImage, UpdateProduct } from "../../types/admin/product.types";
import { deleteFromCloudinary, uploadToCloudinary } from "../../utils/cloudinary";
import { AppError } from "../../utils/app-error";
import { Product } from "../../models/product.models";
import { Category } from "../../models/category.models";

export const addProductService = async (data: AddProduct, image: ProductImage): Promise<void> => {
  //Check if the category exists
  const category = await Category.findOne({ slug: data.category });
  if (!category) {
    throw new AppError(400, "Category doesn't exist");
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    //First upload the image to cloudinary
    const result = await uploadToCloudinary(image.fileBuffer, image.fileName);
    if (!result) {
      throw new AppError(500, "Failed to upload image");
    }
    await Product.create(
      [
        {
          name: data.name,
          description: data.description,
          price: data.price,
          discount: data.discount || 0,
          countInStock: data.countInStock,
          category: category._id,
          imageUrl: result.secure_url,
          imagePublicId: result.public_id,
        },
      ],
      { session }
    );
    //Update the  products in the category
    category.totalProducts += 1;
    await category.save({ session });

    await session.commitTransaction();
  } catch (err: any) {
    await session.abortTransaction();
    throw new AppError(500, `Internal Server Error ${err}`);
  } finally {
    await session.endSession();
  }
};

export const updateProductService = async (productId: string, data: UpdateProduct, image?: ProductImage): Promise<void> => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const product = await Product.findById(productId).session(session);
    if (!product) {
      throw new AppError(404, "Product not found");
    }

    //Check if the category exists
    if (data.category) {
      const category = await Category.findOne({ slug: data.category });
      if (!category) {
        throw new AppError(400, "Category doesn't exist");
      }
      product.category = category._id;
    }

    // If there's a new image, first delete the old one  from the cloud and then upload the new one
    if (image.fileBuffer && image.fileName) {
      if (product.imagePublicId) {
        await deleteFromCloudinary(product.imagePublicId);
      }
      const result = await uploadToCloudinary(image.fileBuffer, image.fileName);
      if (!result) {
        throw new AppError(500, "Failed to upload image");
      }
      product.imageUrl = result.secure_url;
      product.imagePublicId = result.public_id;
    }
    if (data.name) product.name = data.name;
    if (data.description) product.description = data.description;
    if (data.price) product.price = data.price;
    if (data.discount) product.discount = data.discount;
    if (data.countInStock) product.countInStock = data.countInStock;

    await product.save({ session });
    await session.commitTransaction();
  } catch (err: any) {
    await session.abortTransaction();
    throw new AppError(500, "Internal Server Error");
  } finally {
    await session.endSession();
  }
};

export const deleteProductService = async (productId: string): Promise<void> => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const product = await Product.findById(productId).session(session);
    if (!product) {
      throw new AppError(404, "Product not found");
    }
    //Delete the image from cloudinary
    if (product.imagePublicId) {
      await deleteFromCloudinary(product.imagePublicId);
    }
    //Decrease the total products in the category
    const category = await Category.findById(product.category).session(session);
    if (category) {
      category.totalProducts -= 1;
      await category.save({ session });
    }

    await product.deleteOne({ _id: productId }).session(session);
    await session.commitTransaction();
  } catch (err: any) {
    await session.abortTransaction();
    throw new AppError(500, "Internal Server Error");
  } finally {
    await session.endSession();
  }
};
