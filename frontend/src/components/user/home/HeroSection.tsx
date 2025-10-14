import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles, Zap, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="relative  min-h-[100vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400/3 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left space-y-8">
            <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-4 py-2.5 rounded-full border border-[#E2E8F0] shadow-card hover:shadow-cardHover transition-all duration-300 animate-fade-in">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#2563EB]" />
                <span className="text-sm font-medium text-[#2563EB]">Next-Gen Electronics Store</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-[#10B981] rounded-full animate-pulse"></div>
                <div className="w-1.5 h-1.5 bg-[#10B981] rounded-full animate-pulse delay-150"></div>
                <div className="w-1.5 h-1.5 bg-[#10B981] rounded-full animate-pulse delay-300"></div>
              </div>
            </div>
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0F172A] tracking-tight leading-tight animate-slide-up">
                Discover The <span className="bg-gradient-to-r from-[#2563EB] to-[#0EA5E9] bg-clip-text text-transparent">Future</span> Of Tech
              </h1>

              <p className="text-lg md:text-xl text-[#64748B] max-w-2xl mx-auto lg:mx-0 leading-relaxed animate-slide-up delay-200">
                Experience cutting-edge technology with premium electronics, curated for innovation seekers and tech enthusiasts.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start animate-slide-up delay-300">
              <div className="flex items-center gap-2 text-sm text-[#64748B]">
                <Zap className="h-4 w-4 text-[#10B981]" />
                <span>Fast Shipping</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#64748B]">
                <Shield className="h-4 w-4 text-[#2563EB]" />
                <span>Warranty on all Products</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#64748B]">
                <Sparkles className="h-4 w-4 text-[#0EA5E9]" />
                <span>Premium Quality</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4 animate-slide-up delay-400">
              <Button
                onClick={() => navigate("/products")}
                className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-8 py-5 text-lg rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/categories")}
                className="border-[#E2E8F0] text-[#64748B] hover:text-[#0F172A] hover:border-[#2563EB] px-8 py-5 text-lg rounded-2xl cursor-pointer transition-all duration-300"
              >
                <Play className="mr-2 h-5 w-5" />
                Explore Categories
              </Button>
            </div>
          </div>
          <div className="relative hidden lg:block animate-float">
            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-[#E2E8F0] shadow-card hover:shadow-cardHover transition-all duration-500">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-6 border border-[#E2E8F0] shadow-card transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <div className="bg-gradient-to-br from-[#2563EB] to-[#0EA5E9] rounded-xl h-32 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <Zap className="h-6 w-6" />
                      </div>
                      <span className="text-sm font-semibold">Smartphones</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-6 border border-[#E2E8F0] shadow-card transform -rotate-2 mt-8 hover:rotate-0 transition-transform duration-300">
                  <div className="bg-gradient-to-br from-[#10B981] to-[#0EA5E9] rounded-xl h-32 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <Sparkles className="h-6 w-6" />
                      </div>
                      <span className="text-sm font-semibold">Laptops</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-6 border border-[#E2E8F0] shadow-card transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                  <div className="bg-gradient-to-br from-[#EF4444] to-[#F59E0B] rounded-xl h-32 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <Shield className="h-6 w-6" />
                      </div>
                      <span className="text-sm font-semibold">Audio</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-6 border border-[#E2E8F0] shadow-card transform rotate-2 mt-8 hover:rotate-0 transition-transform duration-300">
                  <div className="bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] rounded-xl h-32 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <Zap className="h-6 w-6" />
                      </div>
                      <span className="text-sm font-semibold">Accessories</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
