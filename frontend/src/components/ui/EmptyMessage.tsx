import React from "react";

interface EmptyResultProps {
  title: string;
  subtitle?: string;
  description?: string;
}

export const EmptyResult: React.FC<EmptyResultProps> = ({ title, subtitle, description }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="max-w-md w-full mx-auto">
        <div className="mb-6">
          <h3 className="text-2xl md:text-3xl font-semibold text-[#0F172A] mb-3 md:mb-4">{title}</h3>
          {subtitle && <p className="text-lg md:text-xl text-[#64748B] font-medium mb-4 md:mb-5">{subtitle}</p>}
          {description && <p className="text-sm md:text-base text-[#64748B] leading-relaxed">{description}</p>}
        </div>
      </div>
    </div>
  );
};
