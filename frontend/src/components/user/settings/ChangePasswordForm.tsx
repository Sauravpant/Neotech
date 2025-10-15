import { useChangePassword } from "@/hooks/user/useAuth";
import { Loader } from "lucide-react";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ChangePasswordForm = () => {
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [showOldPassword, setShowOldPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);

  const { mutateAsync, isPending } = useChangePassword();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await mutateAsync({ oldPassword, newPassword });
    setOldPassword("");
    setNewPassword("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="currentPassword" className="block text-sm font-medium text-[#0F172A] mb-1">
          Current Password
        </label>
        <div className="relative">
          <input
            type={showOldPassword ? "text" : "password"}
            id="currentPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] transition-all duration-300 text-[#0F172A]"
            required
          />
          <button type="button" onClick={() => setShowOldPassword(!showOldPassword)} className="absolute top-1/2 right-3 transform -translate-y-1/2">
            {showOldPassword ? <FaEyeSlash className="text-[#64748B]" /> : <FaEye className="text-[#64748B]" />}
          </button>
        </div>
      </div>

      <div>
        <label htmlFor="newPassword" className="block text-sm font-medium text-[#0F172A] mb-1">
          New Password
        </label>
        <div className="relative">
          <input
            type={showNewPassword ? "text" : "password"}
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] transition-all duration-300 text-[#0F172A]"
            required
          />
          <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute top-1/2 right-3 transform -translate-y-1/2">
            {showNewPassword ? <FaEyeSlash className="text-[#64748B]" /> : <FaEye className="text-[#64748B]" />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="px-6 py-2 bg-gradient-to-r from-[#2563EB] to-[#0EA5E9] text-white rounded-xl hover:from-[#1D4ED8] hover:to-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer font-medium"
      >
        {isPending ? <Loader className="animate-spin " /> : "Change Password"}
      </button>
    </form>
  );
};

export default ChangePasswordForm