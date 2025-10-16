import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import {
  registerSchema,
  loginSchema,
  changePasswordSchema,
  forgotPasswordSchema,
  verifyAccountSchema,
  otpSchema,
} from "../validators/auth.validators";
import {
  registerService,
  loginService,
  logoutService,
  sendOtpService,
  changePasswordService,
  forgotPasswordService,
  verifyAccountService,
  deleteAccountService,
} from "../services/auth.services";
import { ApiResponse } from "../utils/api-response";
import { AuthenticatedRequest } from "../types/auth.types";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/app-error";
import { User } from "../models/user.models";
import { generateAccessToken } from "../utils/token";

const environment = process.env.NODE_ENV;

export const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const data = registerSchema.parse(req.body);
  await registerService(data);
  return res.status(201).json(new ApiResponse(201, null, "User registered successfully"));
});

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const data = loginSchema.parse(req.body);
  const { accessToken, refreshToken, user } = await loginService(data);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: environment === "production",
    sameSite: environment === "production" ? "none" : "strict",
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: environment === "production",
    sameSite: environment === "production" ? "none" : "strict",
  });

  return res.status(200).json(new ApiResponse(200, user, "Login successful"));
});

export const logoutUser = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user._id.toString();
  await logoutService(userId);

  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  return res.status(200).json(new ApiResponse(200, null, "Logged out successfully"));
});

export const sendOtp = asyncHandler(async (req: Request, res: Response) => {
  const data = otpSchema.parse(req.body);
  await sendOtpService(data.email);
  return res.status(200).json(new ApiResponse(200, null, "OTP sent successfully"));
});

export const changePassword = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const data = changePasswordSchema.parse(req.body);
  const userId = req.user._id.toString();
  await changePasswordService(data, userId);
  return res.status(200).json(new ApiResponse(200, null, "Password changed successfully"));
});

export const forgotPassword = asyncHandler(async (req: Request, res: Response) => {
  const data = forgotPasswordSchema.parse(req.body);
  await forgotPasswordService(data);
  return res.status(200).json(new ApiResponse(200, null, "Password reset successfully"));
});

export const verifyAccount = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const data = verifyAccountSchema.parse(req.body);
  const userId = req.user._id.toString();
  await verifyAccountService(userId, data.otp);

  return res.status(200).json(new ApiResponse(200, null, "Account verified successfully"));
});

export const deleteAccount = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user._id.toString();
  await deleteAccountService(userId);
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  return res.status(200).json(new ApiResponse(200, null, "Account deleted successfully"));
});

export const refreshAccessToken = asyncHandler(async (req: Request, res: Response): Promise<Response> => {
  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken) {
    throw new AppError(401, "Refresh token is missing. Please log in again.");
  }
  //Check if the token exists
  const storedUser = await User.findOne({ refreshToken });
  if (!storedUser) {
    throw new AppError(401, "Refresh token is invalid or does not match any user");
  }
  let decodedToken;
  //Verify the existing token
  try {
    decodedToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as { id: string };
  } catch (error) {
    //if verification fails it means the token is expired -> Clear the cookies and also delete the old token from the database
    await User.findByIdAndUpdate(storedUser._id, { refreshToken: undefined });
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    throw new AppError(401, "Session expired or refresh token invalid. Please log in again.");
  }
  const user = await User.findById(decodedToken._id);
  if (!user) {
    throw new AppError(404, "User not found");
  }
  const newAccessToken = await generateAccessToken(user._id.toString(), user.role);
  const data = {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    imageUrl: user?.imageUrl || null,
    contactNumber: user.contactNumber,
    address: user?.address || null,
    isVerified: user.isVerified,
    isDeactivated: user.isDeactivated,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

  return res
    .status(200)
    .cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: environment === "production",
      sameSite: environment === "production" ? "none" : "strict",
    })
    .json(new ApiResponse(200, data, "Access token refreshed successfully"));
});
