import { z } from "zod";
import { registerSchema, loginSchema, changePasswordSchema, forgotPasswordSchema, verifyAccountSchema } from "../validators/auth.validators";
import { IUser } from "./user.types";
import { Request } from "express";

export type RegisterUser = z.infer<typeof registerSchema>;
export type Login = z.infer<typeof loginSchema>;
export type ChangePassword = z.infer<typeof changePasswordSchema>;
export type ForgotPassword = z.infer<typeof forgotPasswordSchema>;
export type VerifyUser = z.infer<typeof verifyAccountSchema>;

export interface UserResponse {
  _id: string;
  name: string;
  email: string;
  isVerified: boolean;
  isDeactivated: boolean;
  contactNumber: string;
  address?: string;
  role: "user" | "admin";
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginUser extends UserResponse {
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: UserResponse;
}

export interface AuthenticatedRequest extends Request {
  user: IUser;
}
