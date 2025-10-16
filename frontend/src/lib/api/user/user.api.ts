import { api } from "@/lib/utils/axiosInstance";
import type { ApiResponse } from "@/types/common/api.types";
import type { UserResponse, UpdateProfile } from "@/types/user/user.types";

export const getUserProfile = async (): Promise<ApiResponse<UserResponse>> => {
  const response = await api.get<ApiResponse<UserResponse>>("/user/me");
  return response.data;
};

export const updateUserProfile = async (data: UpdateProfile): Promise<ApiResponse<UserResponse>> => {
  const response = await api.patch<ApiResponse<UserResponse>>("/user/update-profile", data);
  return response.data;
};

export const uploadProfilePicture = async (file: File): Promise<ApiResponse<string>> => {
  const formData = new FormData();
  formData.append("profilePicture", file);
  const response = await api.patch<ApiResponse<string>>("/user/upload-profile-picture", formData);
  return response.data;
};

export const deleteProfilePicture = async (): Promise<ApiResponse<null>> => {
  const response = await api.delete<ApiResponse<null>>("/user/delete-profile-picture");
  return response.data;
};

export const deactivateAccount = async (): Promise<ApiResponse<null>> => {
  const response = await api.patch<ApiResponse<null>>("/user/deactivate-account");
  return response.data;
};
