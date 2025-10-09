import { Document, Types } from "mongoose";
import z from "zod";
import { updateProfileSchema } from "../validators/user.validators";

//Interface for user model defination
export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  isVerfied: boolean;
  isDeactivated: boolean;
  contactNumber: string;
  address?: string;
  role: "user" | "admin";
  imageUrl?: string;
  imagePublicId?: string;
  isVerified: boolean;
  refreshToken?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type UpdateProfile = z.infer<typeof updateProfileSchema>;

export interface ImageUpload {
  fileBuffer: Buffer;
  fileName: string;
  _id: string;
}

export interface UserResponse {
  _id: string;
  name: string;
  email: string;
  contactNumber: string;
  address?: string | null;
  role: "user" | "admin";
  isVerified: boolean;
  isDeactivated: boolean;
  imageUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
