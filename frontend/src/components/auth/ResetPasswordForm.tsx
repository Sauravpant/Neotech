import React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, LoaderIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import type { ForgotPassword } from "@/types/user/auth.types";
import { useForgotPassword } from "@/hooks/user/useAuth";
import { getErrorMessage } from "@/lib/getErrorMessage";

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const navigate = useNavigate();
  const { mutateAsync: resetPassword, isPending } = useForgotPassword();
  const [otp, setOtp] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [newPassword, setNewPasasword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPasasword] = useState<string>("");

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      toast.error("Both password must match");
    }
    const data: ForgotPassword = {
      email,
      otp,
      newPassword,
      confirmNewPassword,
    };
    resetPassword(data)
      .then(() => {
        navigate("/auth/login");
      })
      .catch((err: any) => {
        toast.error(getErrorMessage(err) || "Failed to reset password");
      });
  };

  return (
    <>
      <form
        className={cn("flex flex-col gap-4", className)}
        {...props}
        onSubmit={handleSubmit}>
        <div className="flex flex-col items-center gap-2 text-center">
          <p className=" text-sm text-balance text-white">
            Enter the details below to reset your password
          </p>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="saurav@gmail.com"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="otp">Enter the OTP sent to your email</Label>
            <InputOTP
              id="otp"
              maxLength={6}
              pattern={REGEXP_ONLY_DIGITS}
              value={otp}
              onChange={(value) => setOtp(value)}>
              <InputOTPGroup>
                {[...Array(6)].map((_, i) => (
                  <InputOTPSlot key={i} index={i} />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>
          <div className="grid gap-3">
            <div className="flex items-center">
              <Label htmlFor="newPassword">New Password</Label>
            </div>
            <div className="relative">
              <Input
                id="newpassword"
                type={!showPassword ? "password" : "text"}
                required
                className="pr-10"
                onChange={(e) => setNewPasasword(e.target.value)}
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2">
                {showPassword ? <EyeOff /> : <Eye />}
              </div>
            </div>
          </div>
          <div className="grid gap-3">
            <div className="flex items-center">
              <Label htmlFor="confirmNewPassword">Confirm new Password</Label>
            </div>
            <div className="relative">
              <Input
                id="confirmNewPassword"
                type={!showConfirmPassword ? "password" : "text"}
                required
                className="pr-10"
                onChange={(e) => setConfirmNewPasasword(e.target.value)}
              />
              <div
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2">
                {showPassword ? <EyeOff /> : <Eye />}
              </div>
            </div>
          </div>
          <Button type="submit" className="w-full cursor-pointer">
            {isPending ? <LoaderIcon className="animate-spin" /> : "Submit"}
          </Button>
        </div>
      </form>
    </>
  );
}
