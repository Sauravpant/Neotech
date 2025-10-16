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


export interface UpdateProfile {
  name?: string;
  contactNumber?: string;
  address?: string;
}

