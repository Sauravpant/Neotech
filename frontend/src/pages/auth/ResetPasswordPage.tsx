import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm"; 

const ResetPassword = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Reset Your Password
        </h1>
        <ResetPasswordForm />
      </div>
    </div>
  );
};

export default ResetPassword;
