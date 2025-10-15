import ChangePasswordForm from "@/components/user/settings/ChangePasswordForm";
import DeactivateAccountButton from "@/components/user/settings/DeactivateAccount";
import DeleteAccountButton from "@/components/user/settings/DeleteAccount";
import VerifyAccountSection from "@/components/user/settings/VerifyAccount";
import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const AccountSettingsPage = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-4 sm:mb-6">Account Settings</h1>
      {!user?.isVerified && (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-card p-4 sm:p-6 mb-4 sm:mb-6 border border-[#E2E8F0]">
          <h2 className="text-lg sm:text-xl font-semibold text-[#0F172A] mb-3 sm:mb-4">Verify Your Account</h2>
          <VerifyAccountSection />
        </div>
      )}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-card p-4 sm:p-6 mb-4 sm:mb-6 border border-[#E2E8F0]">
        <h2 className="text-lg sm:text-xl font-semibold text-[#0F172A] mb-3 sm:mb-4">Change Password</h2>
        <ChangePasswordForm />
      </div>
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-card p-4 sm:p-6 mb-4 sm:mb-6 border border-[#E2E8F0]">
        <h2 className="text-lg sm:text-xl font-semibold text-[#0F172A] mb-3 sm:mb-4">Deactivate Account</h2>
        <p className="text-[#64748B] mb-4">Temporarily disable your account. You can reactivate it anytime by logging back in.</p>
        <DeactivateAccountButton />
      </div>
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-card p-4 sm:p-6 mb-4 sm:mb-6 border border-[#E2E8F0]">
        <h2 className="text-lg sm:text-xl font-semibold text-[#0F172A] mb-3 sm:mb-4">Delete Account</h2>
        <p className="text-[#64748B] mb-4">Permanently delete your account and all associated data. This action cannot be undone.</p>
        <DeleteAccountButton />
      </div>
    </div>
  );
};

export default AccountSettingsPage;
