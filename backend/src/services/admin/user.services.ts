import { User } from "../../models/user.models";
import { GetAllUsers, GetSingleUser, GetUser, UserDetails, UserStats } from "../../types/admin/user.types";
import { Types } from "mongoose";
import { Order } from "../../models/order.models";
import { Report } from "../../models/report.models";
import { AppError } from "../../utils/app-error";

const validateObjectId = (id: string) => Types.ObjectId.isValid(id);

export const getAllUsersService = async (filters: GetUser): Promise<GetAllUsers> => {
  const { search, page = 1, limit = 10 } = filters;
  const filter: any = {};
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { contactNumber: { $regex: search, $options: "i" } },
      { address: { $regex: search, $options: "i" } },
    ];
  }
  const skip = (page - 1) * limit;

  const totalUsers = await User.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 });
  const total = await User.countDocuments(filter);

  const users: UserDetails[] = totalUsers.map((user) => ({
    _id: user._id.toString(),
    name: user.name,
    email: user.email,
    contactNumber: user.contactNumber,
    address: user.address || null,
    role: user.role || null,
    imageUrl: user.imageUrl || null,
    isVerified: user.isVerified,
    isDeactivated: user.isDeactivated,
  }));
  return {
    users,
    total,
    page,
    limit,
  };
};

export const getUserByIdService = async (userId: string): Promise<GetSingleUser | null> => {
  if (!validateObjectId(userId)) {
    throw new AppError(400, "Invalid user ID");
  }
  const user = await User.findById(userId);
  if (!user) {
    return null;
  }
  const [totalOrders, reportsMade] = await Promise.all([Order.countDocuments({ user: userId }), Report.countDocuments({ user: userId })]);

  return {
    _id: user._id.toString(),
    name: user.name,
    email: user.email,
    contactNumber: user.contactNumber,
    address: user.address || null,
    role: user.role || null,
    imageUrl: user.imageUrl || null,
    isVerified: user.isVerified,
    isDeactivated: user.isDeactivated,
    totalOrders,
    reportsMade,
  };
};

export const deleteUserService = async (userId: string): Promise<void> => {
  if (!validateObjectId(userId)) {
    throw new AppError(400, "Invalid user ID");
  }
  await User.findByIdAndDelete(userId);
};

export const getUserStatsService = async (): Promise<UserStats> => {
  const [totalUsers, verifiedUsers, deactivatedUsers] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ isVerified: true }),
    User.countDocuments({ isDeactivated: true }),
  ]);

  return {
    totalUsers,
    verifiedUsers,
    unverifiedUsers: totalUsers - verifiedUsers,
    deactivatedUsers,
  };
};
