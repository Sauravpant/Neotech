import { useDeleteProfilePicture, useUpdateUserProfile, useUploadProfilePicture } from "@/hooks/user/useUser";
import type { RootState } from "@/store/store";
import type { UpdateProfile } from "@/types/user/user.types";
import { CircleUser, Loader } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

const ProfileSettingsPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2">
        <CircleUser className="h-5 w-5 sm:h-6 sm:w-6" />
        Profile Settings
      </h1>
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-3 sm:mb-4">Profile Picture</h2>
        <ProfileImageSection />
      </div>
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-3 sm:mb-4">Profile Information</h2>
        <ProfileInfoSection />
      </div>
    </div>
  );
};

const ProfileImageSection = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { mutate: uploadPicture, isPending: uploadPending } = useUploadProfilePicture();
  const { mutate: deletePicture, isPending: deletePending } = useDeleteProfilePicture();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadPicture(file);
    }
  };

  const handleDeleteImage = () => {
    deletePicture();
  };
  return (
    <div className="flex flex-col items-center sm:items-start sm:flex-row gap-4 sm:gap-6">
      <div className="flex-shrink-0">
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          {user && user.imageUrl ? (
            <img src={user.imageUrl} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <CircleUser className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400" />
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:gap-4 w-full sm:w-auto">
        <div className="text-center sm:text-left">
          <label className="block text-sm font-medium text-gray-700 mb-3">Update Profile Picture</label>
          <label className="cursor-pointer inline-block">
            <span className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base">
              {uploadPending ? <Loader className="animate-spin h-4 w-4 sm:h-5 sm:w-5 mx-auto" /> : "Choose Image"}
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </span>
          </label>
        </div>

        <div className="text-center sm:text-left">
          <button
            onClick={handleDeleteImage}
            disabled={!user?.imageUrl || deletePending}
            className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm sm:text-base ${
              user?.imageUrl ? "bg-red-600 text-white hover:bg-red-700" : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {deletePending ? <Loader className="animate-spin h-4 w-4 sm:h-5 sm:w-5 mx-auto" /> : "Delete Profile Picture"}
          </button>
        </div>
      </div>
    </div>
  );
};

const ProfileInfoSection = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [name, setName] = useState<string>(user?.name || "");
  const [contactNumber, setContactNumber] = useState<string>(user?.contactNumber || "");
  const [address, setAddress] = useState<string>(user?.address || "");

  const { mutate, isPending } = useUpdateUserProfile();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData: UpdateProfile = {};

    if (name.trim()) userData.name = name.trim();
    if (contactNumber.trim()) userData.contactNumber = contactNumber.trim();
    if (address.trim()) userData.address = address.trim();

    mutate(userData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            placeholder={user?.name || "Enter full name"}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Contact Number
          </label>
          <input
            type="text"
            id="phone"
            value={contactNumber}
            placeholder={user?.contactNumber || "Enter contact number"}
            onChange={(e) => setContactNumber(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <input
            type="text"
            id="address"
            value={address}
            placeholder={user?.address || "Enter address"}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />
        </div>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={isPending}
          className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
        >
          {isPending ? <Loader className="animate-spin h-4 w-4 sm:h-5 sm:w-5 mx-auto" /> : "Update Profile"}
        </button>
      </div>
    </form>
  );
};

export default ProfileSettingsPage;
