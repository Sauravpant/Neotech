import bcrypt from "bcrypt";
import { User } from "../models/user.models";
import { AppError } from "../utils/app-error";
import sendMail from "../utils/nodemailer";
import { ChangePassword, ForgotPassword, Login, LoginResponse, RegisterUser, LoginUser, UserResponse } from "../types/auth.types";
import { Otp } from "../models/otp.models";
import { generateAccessToken, generateRefreshToken } from "../utils/token";
import { Cart } from "../models/cart.models";
import { Order } from "../models/order.models";
import { Review } from "../models/review.models";
import mongoose from "mongoose";

const SALT_ROUNDS: number = Number(process.env.SALT_ROUNDS) || 10;

export const registerService = async (body: RegisterUser) => {
  const user = await User.findOne({ $or: [{ email: body.email }, { contactNumber: body.contactNumber }] });
  if (user) {
    throw new AppError(400, "User with above email or contact number already exists");
  }
  const hashedPassword = await bcrypt.hash(body.password, SALT_ROUNDS);
  await User.create({ ...body, password: hashedPassword });
};

export const loginService = async (data: Login): Promise<LoginResponse> => {
  const user = await User.findOne({ email: data.email }).lean<LoginUser>();
  if (!user) {
    throw new AppError(401, "User doesnt exist");
  }
  const isPasswordMatch = await bcrypt.compare(data.password, user.password);
  if (!isPasswordMatch) {
    throw new AppError(401, "Incorrect password");
  }
  const accessToken = await generateAccessToken(user._id as string, "user");
  const refreshToken = await generateRefreshToken(user._id as string, "user");
  await User.findByIdAndUpdate(user._id, { refreshToken });
  const result: UserResponse = {
    _id: user._id,
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
  return { accessToken, refreshToken, user: result };
};

export const logoutService = async (_id: string): Promise<void> => {
  await User.findByIdAndUpdate(_id, { refreshToken: undefined });
};

export const sendOtpService = async (email: string): Promise<void> => {
  const user = await User.findOne({ email }).select("email");
  if (!user) {
    throw new AppError(404, "User doesn't exist");
  }
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedOtp = await bcrypt.hash(otp, SALT_ROUNDS);
  await Otp.deleteOne({ email });
  await Otp.create({
    email,
    otp: hashedOtp,
  });
  await sendMail(user.email, otp);
};

export const changePasswordService = async (body: ChangePassword, _id: string): Promise<void> => {
  const user = await User.findById(_id).select("password");
  if (!user) {
    throw new AppError(404, "User not found");
  }
  const isMatch = await bcrypt.compare(body.oldPassword, user.password);
  if (!isMatch) {
    throw new AppError(401, "Enter the correct password to continue");
  }
  const hashedPassword = await bcrypt.hash(body.newPassword, SALT_ROUNDS);
  await User.findByIdAndUpdate(_id, { password: hashedPassword });
};

export const forgotPasswordService = async (data: ForgotPassword): Promise<void> => {
  const user = await User.findOne({ email: data.email });
  if (!user) {
    throw new AppError(404, "Invalid email");
  }
  const storedOtp = await Otp.findOne({ email: data.email });
  if (!storedOtp) {
    throw new AppError(404, "Otp not found or expired");
  }
  const isOtpMatch = await bcrypt.compare(data.otp, storedOtp.otp);
  if (!isOtpMatch) {
    throw new AppError(400, "Invalid Otp. Enter the correct one");
  }
  if (data.newPassword !== data.confirmNewPassword) {
    throw new AppError(400, "Both passwords must match");
  }
  const hashedPassword = await bcrypt.hash(data.newPassword, SALT_ROUNDS);
  user.password = hashedPassword;
  await user.save();
  await Otp.deleteOne({ email: data.email });
};

export const verifyAccountService = async (_id: string, otp: string): Promise<void> => {
  const user = await User.findById(_id);
  if (!user) {
    throw new AppError(404, "User doesn't exist");
  }
  const storedOtp = await Otp.findOne({ email: user.email });
  if (!storedOtp) {
    throw new AppError(404, "Otp not found or expired");
  }
  const isOtpMatch = await bcrypt.compare(otp, storedOtp.otp);
  if (!isOtpMatch) {
    throw new AppError(400, "Invalid Otp. Enter the correct one");
  }
  user.isVerified = true;
  await user.save();
  await Otp.deleteOne({ email: user.email });
};

export const deleteAccountService = async (_id: string): Promise<void> => {
  const user = await User.findById(_id).select("_id");
  if (!user) {
    throw new AppError(404, "User doesn't exist");
  }
  //Delete all the documents linked with the user across all collections

  //Using a transaction to ensure atomicity (either all or nothing) according to ACID principles
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    await Promise.all([
      User.findByIdAndDelete(_id, { session }),
      Cart.deleteMany({ user: _id }, { session }),
      Order.deleteMany({ user: _id }, { session }),
      Review.deleteMany({ user: _id }, { session }),
    ]);

    await session.commitTransaction();
  } catch (err: any) {
    await session.abortTransaction();
    throw new AppError(500, "Failed to delete user");
  } finally {
    await session.endSession();
  }
};
