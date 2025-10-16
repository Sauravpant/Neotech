import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserProfile, updateUserProfile, uploadProfilePicture, deleteProfilePicture, deactivateAccount } from "@/lib/api/user/user.api";
import type { UpdateProfile } from "@/types/user/user.types";
import type { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { removeProfilePicture, removeUser, setProfilePicture, setUser } from "@/features/auth/authSlice";
import toast from "react-hot-toast";
import type { ApiResponse } from "@/types/common/api.types";
import type { UserResponse } from "@/types/user/auth.types";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { useNavigate } from "react-router-dom";

export const useAuthUser = () => useSelector((state: RootState) => state.auth.user);

export const useGetUserProfile = () => {
  return useQuery<ApiResponse<UserResponse>, unknown>({
    queryKey: ["user"],
    queryFn: () => getUserProfile(),
    staleTime: Infinity,
  });
};

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch<AppDispatch>();
  return useMutation<ApiResponse<UserResponse>, unknown, UpdateProfile>({
    mutationFn: (data: UpdateProfile) => updateUserProfile(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      dispatch(setUser(response.data));
      toast.success(response?.message || "Profile updated successfully");
    },
    onError: (err: any) => {
      toast.error(getErrorMessage(err) || "Failed to update profile");
    },
  });
};

export const useUploadProfilePicture = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch<AppDispatch>();
  return useMutation<ApiResponse<string>, unknown, File>({
    mutationFn: (file: File) => uploadProfilePicture(file),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      dispatch(setProfilePicture(response?.data || ""));
      toast.success(response?.message || "Profile picture uploaded successfully");
    },
    onError: (err: any) => {
      toast.error(getErrorMessage(err) || "Failed to upload profile picture");
    },
  });
};

export const useDeleteProfilePicture = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch<AppDispatch>();
  return useMutation<ApiResponse<null>, unknown, void>({
    mutationFn: () => deleteProfilePicture(),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      dispatch(removeProfilePicture());
      toast.success(response?.message || "Profile picture deleted successfully");
    },
    onError: (err: any) => {
      toast.error(getErrorMessage(err) || "Failed to delete profile picture");
    },
  });
};

export const useDeactivateAccount = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  return useMutation<ApiResponse<null>, unknown, void>({
    mutationFn: () => deactivateAccount(),
    onSuccess: (response) => {
      toast.success(response?.message || "Account deactivated successfully");
      queryClient.clear();
      dispatch(removeUser());
      navigate("/");
    },
    onError: (err: any) => {
      toast.error(getErrorMessage(err) || "Failed to deactivate account");
    },
  });
};
