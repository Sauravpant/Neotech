import { Request, Response } from "express";
import { asyncHandler } from "../../utils/async-handler";
import { deleteUserService, getAllUsersService, getUserByIdService, getUserStatsService } from "../../services/admin/user.services";
import { ApiResponse } from "../../utils/api-response";
import { getUsersSchema } from "../../validators/admin/user.validators";

export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const filters = getUsersSchema.parse(req.query);
  const result = await getAllUsersService(filters);
  res.status(200).json(new ApiResponse(200, result, "Users fetched successfully"));
});

export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const result = await getUserByIdService(userId);
  res.status(200).json(new ApiResponse(200, result, "User fetched successfully"));
});


export const deleteUserById = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;
  await deleteUserService(userId);
  res.status(200).json(new ApiResponse(200, null, "User deleted successfully"));
});

export const getUserStats = asyncHandler(async (req: Request, res: Response) => {
  const result = await getUserStatsService();
  res.status(200).json(new ApiResponse(200, result, "User stats fetched successfully"));
});