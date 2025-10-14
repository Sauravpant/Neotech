import { AuthSide } from "@/components/auth/AuthSide";
import { LoginForm } from "@/components/auth/LoginForm";
const LoginPage = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col p-6 md:p-10 bg-gradient-to-r from-slate-800 to-slate-900 text-white">
        <div className="flex justify-center">
          <h1 className="flex items-center gap-2 font-extrabold text-3xl md:text-5xl tracking-tight bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Welcome to TechStore
          </h1>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <LoginForm />
        </div>
      </div>
      <div className="hidden lg:flex items-center justify-center p-12 bg-gradient-to-br from-blue-900 to-slate-800">
        <AuthSide />
      </div>
    </div>
  );
};

export default LoginPage;