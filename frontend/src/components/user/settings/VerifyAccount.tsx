import { useSendOtp, useVerifyAccount } from "@/hooks/user/useAuth";
import type { RootState } from "@/store/store";
import { useState } from "react";
import { useSelector } from "react-redux";

const VerifyAccountSection = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
  const otpMutation = useSendOtp();
  const { mutate: verifyAccount, isPending } = useVerifyAccount();
  const handleSendOtp = async () => {
    try {
      if (user) {
        await otpMutation.mutateAsync(user.email);
      }
      setIsOtpSent(true);
    } catch (err: any) {
      return;
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await verifyAccount(otp);
      setIsVerifying(false);
      setIsOtpSent(false);
      setOtp("");
    } catch (err: any) {
      return;
    }
  };

  return (
    <div>
      {!isVerifying ? (
        <button
          onClick={() => setIsVerifying(true)}
          className="px-4 py-2 bg-gradient-to-r from-[#10B981] to-[#0EA5E9] text-white rounded-xl hover:from-[#059669] hover:to-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#10B981] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer font-medium"
        >
          Verify Your Account
        </button>
      ) : (
        <div className="space-y-4">
          {!isOtpSent ? (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <p className="text-[#64748B]">We'll send a verification code to your email</p>
              <div className="flex gap-3">
                <button
                  onClick={handleSendOtp}
                  className="px-4 py-2 bg-gradient-to-r from-[#2563EB] to-[#0EA5E9] text-white rounded-xl hover:from-[#1D4ED8] hover:to-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Send OTP
                </button>
                <button
                  onClick={() => setIsVerifying(false)}
                  className="px-4 py-2 bg-[#E2E8F0] text-[#64748B] rounded-xl hover:bg-[#CBD5E1] focus:outline-none focus:ring-2 focus:ring-[#94A3B8] transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleVerifyOtp} className="flex flex-col sm:flex-row items-end gap-3 sm:gap-4">
              <div className="flex-1">
                <label htmlFor="otp" className="block text-sm font-medium text-[#0F172A] mb-1">
                  Enter OTP
                </label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] transition-all duration-300 text-[#0F172A]"
                  placeholder="Enter verification code"
                  required
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-4 py-2 bg-gradient-to-r from-[#10B981] to-[#0EA5E9] text-white rounded-xl hover:from-[#059669] hover:to-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#10B981] transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Verify OTP
                </button>
                <button
                  onClick={() => {
                    setIsVerifying(false);
                    setIsOtpSent(false);
                  }}
                  className="px-4 py-2 bg-[#E2E8F0] text-[#64748B] rounded-xl hover:bg-[#CBD5E1] focus:outline-none focus:ring-2 focus:ring-[#94A3B8] transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default VerifyAccountSection;
