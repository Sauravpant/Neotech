import { api } from "@/lib/utils/axiosInstance";
import type { ApiResponse } from "@/types/common/api.types";
import type { RegisterUser, Login, ChangePassword, ForgotPassword, UserResponse } from "@/types/user/auth.types";

export const registerUser = async (data: RegisterUser): Promise<ApiResponse<null>> => {
  const response = await api.post<ApiResponse<null>>("/auth/register", data);
  return response.data;
};

export const loginUser = async (data: Login): Promise<ApiResponse<UserResponse>> => {
  const response = await api.post<ApiResponse<UserResponse>>("/auth/login", data);
  return response.data;
};

export const logoutUser = async (): Promise<ApiResponse<null>> => {
  const response = await api.post<ApiResponse<null>>("/auth/logout");
  return response.data;
};

export const sendOtp = async (email: string): Promise<ApiResponse<null>> => {
  const response = await api.post<ApiResponse<null>>("/auth/send-otp", { email });
  return response.data;
};

export const changePassword = async (data: ChangePassword): Promise<ApiResponse<null>> => {
  const response = await api.patch<ApiResponse<null>>("/auth/change-password", data);
  return response.data;
};

export const forgotPassword = async (data: ForgotPassword): Promise<ApiResponse<null>> => {
  const response = await api.patch<ApiResponse<null>>("/auth/forgot-password", data);
  return response.data;
};

export const verifyAccount = async (otp: string): Promise<ApiResponse<null>> => {
  const response = await api.patch<ApiResponse<null>>("/auth/verify-account", { otp });
  return response.data;
};

export const deleteAccount = async (): Promise<ApiResponse<null>> => {
  const response = await api.delete<ApiResponse<null>>("/auth/delete-account");
  return response.data;
};
