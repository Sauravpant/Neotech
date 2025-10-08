import { Document } from "mongoose";

//Interface for user model defination
export interface IUser extends Document {
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
  createdAt: Date;
  updatedAt: Date;
}

