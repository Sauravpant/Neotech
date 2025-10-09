import { User } from "../models/user.models";
import { AppError } from "../utils/app-error";
import { UpdateProfile, UserResponse, ImageUpload } from "../types/user.types";
import { uploadToCloudinary, deleteFromCloudinary } from "../utils/cloudinary";

export const uploadPicture = async (data: ImageUpload): Promise<string> => {
  const user = await User.findById(data._id);

  if (!user) {
    throw new AppError(404, "User not found");
  }
  
  if (user.imagePublicId) {
    await deleteFromCloudinary(user.imagePublicId);
  }

  const result = await uploadToCloudinary(data.fileBuffer, data.fileName);
  if (!result) {
    throw new AppError(500, "Failed to upload image");
  }
  user.imageUrl = result.secure_url;
  user.imagePublicId = result.public_id;

  await user.save();

  return user.imageUrl!;
};

export const deletePictureService = async (userId: string): Promise<void> => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(404, "User not found");
  }

  if (user.imagePublicId) {
    await deleteFromCloudinary(user.imagePublicId);
  }

  user.imageUrl = null;
  user.imagePublicId = null;

  await user.save();
};

export const getUserProfileService = async (userId: string): Promise<UserResponse> => {
  const user = await User.findById(userId).lean();
  if (!user) {
    throw new AppError(404, "User not found");
  }

  return {
    _id: user._id.toString(),
    name: user.name,
    email: user.email,
    contactNumber: user.contactNumber,
    address: user.address || null,
    role: user.role,
    isVerified: user.isVerified,
    isDeactivated: user.isDeactivated,
    imageUrl: user.imageUrl || null,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

export const deactivateAccountService = async (userId: string): Promise<void> => {
  const user = await User.findByIdAndUpdate(userId, { isDeactivated: true, refreshToken: undefined });
  if (!user) {
    throw new AppError(404, "User not found");
  }
};

export const updateUserProfileService = async (userId: string, data: UpdateProfile): Promise<UserResponse> => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(404, "User not found");
  }
  if (data.name) user.name = data.name;
  if (data.contactNumber) user.contactNumber = data.contactNumber;
  if (data.address) user.address = data.address;

  await user.save();

  return {
    _id: user._id.toString(),
    name: user.name,
    email: user.email,
    contactNumber: user.contactNumber,
    address: user.address || null,
    role: user.role,
    isVerified: user.isVerified,
    isDeactivated: user.isDeactivated,
    imageUrl: user.imageUrl || null,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};
