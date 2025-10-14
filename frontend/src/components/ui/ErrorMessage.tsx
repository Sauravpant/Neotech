import React from "react";

interface ErrorMessageProps {
  title: string;
  refetch: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ title, refetch }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-card max-w-md mx-4 border border-[#E2E8F0]">
        <h2 className="text-xl font-semibold text-[#0F172A] mb-2">{title}</h2>
        <p className="text-[#64748B] mb-6">Some Error Occurred. Try again</p>
        <button
          className="px-6 py-3 bg-gradient-to-r from-[#2563EB] to-[#0EA5E9] text-white rounded-xl hover:from-[#1D4ED8] hover:to-[#2563EB] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 font-medium"
          onClick={() => refetch()}
        >
          Try Again
        </button>
      </div>
    </div>
  );
};
