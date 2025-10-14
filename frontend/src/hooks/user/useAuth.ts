import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerUser, loginUser, logoutUser, sendOtp, changePassword, forgotPassword, verifyAccount, deleteAccount } from "@/lib/api/user/auth.api";
import type { RegisterUser, Login, ChangePassword, ForgotPassword, UserResponse } from "@/types/user/auth.types";
import type { ApiResponse } from "@/types/common/api.types";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/store";
import { setUser, removeUser, setVerify } from "@/features/auth/authSlice";
import { getErrorMessage } from "@/lib/getErrorMessage";

export const useRegister = () => {
  const navigate = useNavigate();
  return useMutation<ApiResponse<null>, unknown, RegisterUser>({
    mutationFn: (data: RegisterUser) => registerUser(data),
    onSuccess: (data) => {
      toast.success(data?.message || "User registered successfully");
      navigate("/auth/login");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to register account");
    },
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  return useMutation<ApiResponse<UserResponse>, unknown, Login>({
    mutationFn: (data: Login) => loginUser(data),
    onSuccess: (data) => {
      dispatch(setUser(data.data));
      const role = data.data.role;
      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
      toast.success(data?.message || "Logged in successfully");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to login");
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  return useMutation<ApiResponse<null>, unknown, null>({
    mutationFn: () => logoutUser(),
    onSuccess: (data) => {
      dispatch(removeUser());
      navigate("/");
      toast.success(data?.message || "Logged out successfully");
      queryClient.clear();
    },
    onError: (err: any) => {
      console.log(err);
      toast.error(getErrorMessage(err) || "Failed to logout");
    },
  });
};

export const useSendOtp = () => {
  return useMutation<ApiResponse<null>, unknown, string>({
    mutationFn: (email: string) => sendOtp(email),
    onSuccess: (data) => {
      toast.success(data?.message || "OTP sent to your email");
    },
    onError: (err: any) => {
      toast.error(getErrorMessage(err) || "Failed to send otp to your email");
    },
  });
};

export const useChangePassword = () => {
  return useMutation<ApiResponse<null>, unknown, ChangePassword>({
    mutationFn: (data: ChangePassword) => changePassword(data),
    onSuccess: (data) => {
      toast.success(data?.message || "Password changed successfully");
    },
    onError: (err: any) => {
      toast.error(getErrorMessage(err) || "Failed to change password");
    },
  });
};

export const useForgotPassword = () => {
  return useMutation<ApiResponse<null>, unknown, ForgotPassword>({
    mutationFn: (data: ForgotPassword) => forgotPassword(data),
    onSuccess: (data) => {
      toast.success(data?.message || "Password reset successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error) || "Failed to reset password");
    },
  });
};

export const useVerifyAccount = () => {
  const dispatch = useDispatch<AppDispatch>();
  return useMutation<ApiResponse<null>, unknown, string>({
    mutationFn: (otp: string) => verifyAccount(otp),
    onSuccess: (data) => {
      dispatch(setVerify());
      toast.success(data?.message || "Account verified successfully");
    },
    onError: (err: any) => {
      toast.error(getErrorMessage(err) || "Failed to verify account");
    },
  });
};

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  return useMutation<ApiResponse<null>, unknown, null>({
    mutationFn: () => deleteAccount(),
    onSuccess: (data) => {
      dispatch(removeUser());
      navigate("/");
      toast.success(data?.message || "Account deleted successfully");
      queryClient.clear();
    },
    onError: (err: any) => {
      toast.error(getErrorMessage(err) || "Failed to delete account");
    },
  });
};
