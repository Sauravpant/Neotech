import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllUsers, getUserById, deleteUserById } from "@/lib/api/admin/user.api";
import type { GetAllUsers, GetSingleUser, GetUser } from "@/types/admin/user.types";
import { useAuthUser } from "../user/useUser";
import type { ApiResponse } from "@/types/common/api.types";
import toast from "react-hot-toast";
import { getErrorMessage } from "@/lib/getErrorMessage";

export const useGetAllUsers = (params?: GetUser) => {
  const user = useAuthUser();
  return useQuery<ApiResponse<GetAllUsers>, unknown>({
    queryKey: ["admin", "users", params],
    queryFn: () => getAllUsers(params),
    staleTime: Infinity,
    enabled: !!user && user.role === "admin",
  });
};

export const useGetUserById = (userId: string) => {
  return useQuery<ApiResponse<GetSingleUser>, unknown>({
    queryKey: ["admin", "user", userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
    staleTime: Infinity,
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<null>, unknown, string>({
    mutationFn: (userId) => deleteUserById(userId),
    onSuccess: (response) => {
      toast.success(response.message || "User deleted successfully ");
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "stats"] });
    },
    onError: (err: any) => {
      toast.error(getErrorMessage(err) || "Failed to delete user ");
    },
  });
};
