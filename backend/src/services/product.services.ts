import { Types } from "mongoose";
import { AppError } from "../utils/app-error";
import { Product } from "../models/product.models";
import { ICategory } from "../types/category.types";
import { GetAllProductsResponse, IProduct, ProductByIdResponse, ProductParams } from "../types/product.types";
import { Category } from "../models/category.models";

const validateObjectId = (id: string) => Types.ObjectId.isValid(id);

export const getAllProductsService = async (params: ProductParams): Promise<GetAllProductsResponse> => {
  const { category, name, minPrice, maxPrice, sortBy = "latest", page = 1, limit = 10 } = params;

  const filter: any = {};
  if (category) {
    const result = await Category.findOne({ slug: category });
    if (!result) {
      return null;
    }
    filter.category = result._id;
  }
  if (name) {
    filter.name = { $regex: name, $options: "i" };
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    filter.price = {};
    if (minPrice !== undefined) filter.price.$gte = minPrice;
    if (maxPrice !== undefined) filter.price.$lte = maxPrice;
  }

  let sort: any = {};
  switch (sortBy) {
    case "latest":
      sort.createdAt = -1;
      break;
    case "oldest":
      sort.createdAt = 1;
      break;
    case "priceAsc":
      sort.price = 1;
      break;
    case "priceDesc":
      sort.price = -1;
      break;
  }
  const skip = (page - 1) * limit;
  const productsData = await Product.find(filter)
    .select("name imageUrl description countInStock category price createdAt discount")
    .populate<{ category: ICategory }>("category", "_id name")
    .sort(sort)
    .skip(skip)
    .limit(limit);

  const products = productsData.map((p) => ({
    _id: p._id.toString(),
    name: p.name,
    imageUrl: p.imageUrl,
    description: p.description,
    countInStock: p.countInStock,
    category: {
      _id: p.category?._id.toString(),
      name: p.category?.name || "",
    },
    price: p.price,
    createdAt: p.createdAt!,
    discount: p.discount,
  }));
  const total = await Product.countDocuments(filter);
  return {
    products,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
};

export const getProductByIdService = async (productId: string): Promise<ProductByIdResponse> => {
  if (!validateObjectId(productId)) {
    throw new AppError(400, "Product id is invalid");
  }
  const agg = await Product.aggregate([
    //Pipeline Stage 1 : _id in Product is the key to be joined with other Schemas
    { $match: { _id: new Types.ObjectId(productId) } },

    //Pipeline Stage 2: Join the Product model with Category (localField is like Primary key in SQL and foreignField is like Foreign key in SQL) and store the result in category
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "category",
      },
    },

    //Pipeline Stage 3: Flatten the category array into individual documents . $unwind converts subdocuments inside a result into individual documents
    { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },

    //Pipeline Stage 4: Join the Product model with the Reviews
    {
      $lookup: {
        from: "reviews",
        localField: "_id",
        foreignField: "product",
        as: "reviews",
      },
    },

    //Pipeline Stage 5: Unwind reviews array into individual documents
    { $unwind: { path: "$reviews", preserveNullAndEmptyArrays: true } },

    //Pipeline Stage 6: Populate the user inside the reviews
    {
      $lookup: {
        from: "users",
        localField: "reviews.user",
        foreignField: "_id",
        as: "reviews.user",
      },
    },

    // Pipeline Stage 7: Unwind reviews.user array into single objects
    { $unwind: { path: "$reviews.user", preserveNullAndEmptyArrays: true } },

    //Pipeline Stage 8:Group the scattered objects
    {
      $group: {
        _id: "$_id", //Group by ID (Same as GROUP BY in SQL)
        name: { $first: "$name" },
        description: { $first: "$description" },
        price: { $first: "$price" },
        discount: { $first: "$discount" },
        imageUrl: { $first: "$imageUrl" },
        countInStock: { $first: "$countInStock" },
        category: { $first: "$category" },
        avgRating: { $avg: "$reviews.rating" },
        totalReviews: { $sum: { $cond: [{ $ifNull: ["$reviews._id", false] }, 1, 0] } },
        reviews: {
          $push: {
            $cond: [
              { $ifNull: ["$reviews._id", false] }, //check If review exists
              //If review exists push this
              {
                _id: "$reviews._id",
                rating: "$reviews.rating",
                comment: { $ifNull: ["$reviews.comment", null] },
                createdAt: "$reviews.createdAt",
                updatedAt: "$reviews.updatedAt",
                user: {
                  _id: "$reviews.user._id",
                  name: "$reviews.user.name",
                  imageUrl: { $ifNull: ["$reviews.user.imageUrl", null] },
                },
              },
              //Else remove the document and return null
              "$$REMOVE",
            ],
          },
        },
      },
    },
  ]);
  return agg[0] || null;
};
