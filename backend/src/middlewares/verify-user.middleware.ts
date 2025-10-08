import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import { User } from "../models/user.models";
import { IUser } from "../types/user.types";
import { AppError } from "../utils/app-error";

interface AuthenticatedRequest extends Request {
  user?: IUser;
}
export const verifyUser = asyncHandler(async (req: AuthenticatedRequest, _res: Response, next: NextFunction) => {
  const user = await User.findById(req.user._id).select("isVerified");
  if (!user) {
    throw new AppError(404, "User not found");
  }
  if (user.isVerified) {
    return next();
  } else {
    throw new AppError(403, "Forbidden: user is not verified");
  }
});
