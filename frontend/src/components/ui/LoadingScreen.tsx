import Spinner from "./Spinner";

interface LoadingScreenProps {
  title: string;
  subtitle: string | undefined;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ title, subtitle }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="text-center">
        <Spinner />
        <h2 className="text-xl font-semibold text-[#0F172A]">{title}</h2>
        {subtitle && <p className="text-[#64748B] mt-2">{subtitle}</p>}
      </div>
    </div>
  );
};
