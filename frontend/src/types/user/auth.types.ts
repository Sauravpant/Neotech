export interface UserResponse {
  _id: string;
  name: string;
  email: string;
  contactNumber: string;
  address?: string | null;
  role: "user" | "admin";
  isVerified: boolean;
  isDeactivated: boolean;
  imageUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
}


export interface RegisterUser {
  name: string;
  email: string;
  password: string;
  contactNumber: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface ChangePassword {
  oldPassword: string;
  newPassword: string;
}

export interface ForgotPassword {
  email: string;
  otp: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface AuthState {
  user: UserResponse | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  checkingAuth: boolean;
  error: string | null;
}
