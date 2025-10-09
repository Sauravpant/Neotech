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
    maxAge: 1 * 60 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: environment === "production",
    sameSite: environment === "production" ? "none" : "strict",
    maxAge: 2 * 24 * 60 * 60 * 1000,
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
