import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { User, Mail, Phone, MapPin, Shield, Settings, Calendar, CheckCircle } from "lucide-react";
import { formatDate } from "@/lib/helpers";

const ProfilePage = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  if (!user) {
    return <LoadingScreen title="Loading profile" subtitle="Please wait while we load your profile information" />;
  }

  const handleProfileSettings = () => navigate("/settings");
  const handleAccountSettings = () => navigate("/settings/account");

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6">
      <div className="container mx-auto px-3 sm:px-4 max-w-2xl">
        <div className="text-center mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">My Profile</h1>
          <p className="text-xs sm:text-sm text-gray-600">Manage your account settings</p>
        </div>

        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4 lg:p-6 mb-4 sm:mb-6">
          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="relative">
              {user.imageUrl ? (
                <img
                  src={user.imageUrl}
                  alt={user.name}
                  className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-lg sm:rounded-xl object-cover border border-gray-300"
                />
              ) : (
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-lg sm:rounded-xl bg-blue-500 flex items-center justify-center">
                  <User className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">{user.name}</h2>
              <p className="text-xs sm:text-sm text-gray-600 truncate">{user.email}</p>
              <div className="flex gap-1 sm:gap-2 mt-1">
                <span
                  className={`px-2 py-1 rounded text-[10px] sm:text-xs font-medium ${
                    user.role === "admin" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {user.role}
                </span>
                <span
                  className={`px-2 py-1 rounded text-[10px] sm:text-xs font-medium ${
                    user.isVerified ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}
                >
                  {user.isVerified ? "Verified" : "Not Verified"}
                </span>
                <span
                  className={`px-2 py-1 rounded text-[10px] sm:text-xs font-medium ${
                    user.isDeactivated ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                  }`}
                >
                  {user.isDeactivated ? "Inactive" : "Active"}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6">
            <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded-lg">
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-gray-500">Email</p>
                <p className="text-sm sm:text-base text-gray-900 truncate">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded-lg">
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-gray-500">Phone</p>
                <p className="text-sm sm:text-base text-gray-900">{user.contactNumber}</p>
              </div>
            </div>

            {user.address && (
              <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded-lg md:col-span-2">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm text-gray-500">Address</p>
                  <p className="text-sm sm:text-base text-gray-900">{user.address}</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded-lg">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-gray-500">Joined</p>
                <p className="text-sm sm:text-base text-gray-900">{formatDate(user.createdAt)}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded-lg">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-gray-500">Status</p>
                <p className={`text-sm sm:text-base font-medium ${user.isDeactivated ? "text-red-600" : "text-green-600"}`}>
                  {user.isDeactivated ? "Deactivated" : "Active"}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t pt-3 sm:pt-4">
            <div className="text-xs sm:text-sm">
              <p className="text-gray-500 mb-1">User ID</p>
              <p className="text-gray-900 font-medium text-[10px] sm:text-xs">{user._id}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          <button
            onClick={handleProfileSettings}
            className="bg-white p-3 sm:p-4 rounded-lg sm:rounded-xl border border-gray-200 cursor-pointer hover:border-blue-300 hover:shadow-sm transition-all text-left"
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <User className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Profile Settings</h3>
                <p className="text-gray-600 text-xs sm:text-sm">Update personal information</p>
              </div>
              <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            </div>
          </button>

          <button
            onClick={handleAccountSettings}
            className="bg-white p-3 sm:p-4 rounded-lg sm:rounded-xl border border-gray-200 hover:border-purple-300 cursor-pointer hover:shadow-sm transition-all text-left"
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Account Settings</h3>
                <p className="text-gray-600 text-xs sm:text-sm">Manage security & preferences</p>
              </div>
              <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
