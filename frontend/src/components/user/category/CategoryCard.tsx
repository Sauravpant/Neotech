import type { ICategory } from "@/types/common/category.types";
import { useNavigate } from "react-router-dom";
import { Cpu, CircuitBoard } from "lucide-react";

const CategoryCard = ({ data }: { data: ICategory }) => {
  const navigate = useNavigate();

  const handleCategory = (category: string) => {
    navigate(`/products/?category=${category}`);
  };

  const getCategoryColor = (name: string) => {
    const colors = [
      "from-[#2563EB] to-[#0EA5E9]",
      "from-[#10B981] to-[#0EA5E9]",
      "from-[#8B5CF6] to-[#EC4899]",
      "from-[#F59E0B] to-[#EF4444]",
      "from-[#EF4444] to-[#F59E0B]",
      "from-[#0EA5E9] to-[#10B981]",
      "from-[#EC4899] to-[#8B5CF6]",
      "from-[#F59E0B] to-[#8B5CF6]",
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  const gradientClass = getCategoryColor(data.name);

  return (
    <div
      className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 border border-[#E2E8F0] shadow-card hover:shadow-cardHover transition-all duration-500 hover:-translate-y-1 cursor-pointer group relative overflow-hidden"
      onClick={() => handleCategory(data.slug)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative z-10 flex flex-col items-center text-center gap-4">
        <div className="relative">
          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br ${gradientClass} group-hover:scale-110 transition-transform duration-300 shadow-lg`}
          >
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/30">
              <Cpu className="w-6 h-6 text-white" />
            </div>
          </div>
          <div
            className={`absolute -inset-2 rounded-2xl bg-gradient-to-br ${gradientClass} opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-500`}
          ></div>
        </div>

        <div className="space-y-2">
          <h1 className="font-bold text-base text-[#0F172A] group-hover:text-[#2563EB] transition-colors duration-300">{data.name}</h1>
        </div>

        <div className="h-12 overflow-hidden">
          <p className="text-sm text-[#64748B] line-clamp-2 leading-relaxed font-medium">{data.description}</p>
        </div>

        <div className="h-12 overflow-hidden">
          <p className="text-sm text-[#64748B] line-clamp-2 leading-relaxed font-medium">{data.totalProducts} Products</p>
        </div>

        <div className="w-full pt-3 border-t border-[#E2E8F0] group-hover:border-[#2563EB]/20 transition-colors duration-300">
          <span className="text-xs font-semibold text-[#2563EB] group-hover:text-[#1D4ED8] transition-colors duration-300 flex items-center justify-center gap-2">
            Explore {data.name} Products
            <CircuitBoard className="w-3 h-3 group-hover:scale-110 transition-transform duration-300" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
