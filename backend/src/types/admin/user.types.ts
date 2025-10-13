import z, { int } from "zod";
import { getUsersSchema } from "../../validators/admin/user.validators";

export interface UserDetails {
  _id: string;
  name: string;
  email: string;
  contactNumber: string;
  address: string | null;
  role: "user" | "admin";
  imageUrl: string | null;
  isVerified: boolean;
  isDeactivated: boolean;
}
[];


export interface GetAllUsers {
  users: UserDetails[];
  total: number;
  page: number;
  limit: number;
}

export interface GetSingleUser extends UserDetails {
  totalOrders: number;
  reportsMade: number;
} 

export interface UserStats {
  totalUsers: number;
  verifiedUsers: number;
  unverifiedUsers: number;
  deactivatedUsers: number;
} 

export type GetUser = z.infer<typeof getUsersSchema>;
