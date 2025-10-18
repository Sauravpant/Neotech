import { ForgetPasswordForm } from "@/components/auth/ForgetPasswordForm"; 
import type React from "react";

const ForgetPassword: React.FC = () => {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <ForgetPasswordForm />
      </div>
    </div>
  );
};

export default ForgetPassword;
