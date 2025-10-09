import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import {
  uploadPicture,
  deletePictureService,
  getUserProfileService,
  deactivateAccountService,
  updateUserProfileService,
} from "../services/user.services";
import { ApiResponse } from "../utils/api-response";
import { AuthenticatedRequest } from "../types/auth.types";
import { UpdateProfile } from "../types/user.types";
import { AppError } from "../utils/app-error";
import { updateProfileSchema } from "../validators/user.validators";

export const uploadProfilePicture = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  if (!req.file) {
    throw new AppError(400, "Image is required");
  }
  const result = await uploadPicture({ fileBuffer: req.file.buffer, fileName: req.file.originalname, _id: req.user._id.toString() });
  return res.status(200).json(new ApiResponse(200, result, "Profile picture uploaded successfully"));
});

export const deleteProfilePicture = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  await deletePictureService(req.user._id.toString());
  return res.status(200).json(new ApiResponse(200, null, "Profile picture deleted successfully"));
});

export const getUserProfile = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const user = await getUserProfileService(req.user._id.toString());
  return res.status(200).json(new ApiResponse(200, user, "User profile fetched successfully"));
});

export const deactivateAccount = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  await deactivateAccountService(req.user._id.toString());
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  return res.status(200).json(new ApiResponse(200, null, "Account deactivated successfully"));
});

export const updateUserProfile = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const data: UpdateProfile = updateProfileSchema.parse(req.body);
  const updatedUser = await updateUserProfileService(req.user._id.toString(), data);
  return res.status(200).json(new ApiResponse(200, updatedUser, "Profile updated successfully"));
});
