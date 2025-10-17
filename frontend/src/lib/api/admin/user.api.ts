import { api } from "@/lib/utils/axiosInstance";
import type { ApiResponse } from "@/types/common/api.types";
import type { GetAllUsers, GetSingleUser, GetUser } from "@/types/admin/user.types";


export const getAllUsers = async (params?: GetUser): Promise<ApiResponse<GetAllUsers>> => {
  const response = await api.get<ApiResponse<GetAllUsers>>("/admin/user/all-users", {
    params,
  });
  return response.data;
};

export const getUserById = async (userId: string): Promise<ApiResponse<GetSingleUser>> => {
  const response = await api.get<ApiResponse<GetSingleUser>>(`/admin/user/get-user/${userId}`);
  return response.data;
};

export const deleteUserById = async (userId: string): Promise<ApiResponse<null>> => {
  const response = await api.delete<ApiResponse<null>>(`/admin/user/delete-user/${userId}`);
  return response.data;
};

