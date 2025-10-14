import { Smartphone, Cpu, UserCheck, Zap, Shield, Globe } from "lucide-react";

const AboutPlatform = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">
            Why Choose <span className="text-[#2563EB]">NeoTech</span>?
          </h2>
          <p className="text-lg text-[#64748B] max-w-2xl mx-auto leading-relaxed">
            We're committed to providing the best electronics shopping experience with premium products and exceptional service.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-8 border border-[#E2E8F0] shadow-card hover:shadow-cardHover transition-all duration-500 hover:scale-105 animate-slide-up overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {" "}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              ></div>
              <div className="relative z-10">
                <div className="flex items-start gap-4">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg transform group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-[#0F172A] mb-2 group-hover:text-[#2563EB] transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-[#64748B] text-sm md:text-base leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-20 relative overflow-hidden rounded-3xl p-8 md:p-12 text-white shadow-xl animate-fade-in">
          <div className="absolute inset-0 bg-gradient-to-r from-[#2563EB] via-[#0EA5E9] to-[#2563EB] animate-gradient-x"></div>
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%,transparent_100%)] bg-[length:250px_250px] animate-pulse-slow"></div>

          <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: "98%", label: "Customer Satisfaction" },
              { value: "24/7", label: "Support Available" },
              { value: "100+", label: "Brand Partners" },
              { value: "4.9/5", label: "Average Rating" },
            ].map((stat, index) => (
              <div key={index} className="animate-bounce-in" style={{ animationDelay: `${index * 200}ms` }}>
                <div className="text-3xl md:text-4xl font-bold mb-2 drop-shadow-lg">{stat.value}</div>
                <div className="text-blue-100 text-sm md:text-base font-medium drop-shadow">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPlatform;

const features = [
  {
    icon: Smartphone,
    title: "10,000+ Products",
    description: "Latest smartphones, laptops, and gadgets from top brands",
    gradient: "from-[#2563EB] to-[#0EA5E9]",
    bgGradient: "from-blue-50 to-cyan-50",
  },
  {
    icon: Cpu,
    title: "50+ Categories",
    description: "From processors to peripherals, everything tech-related",
    gradient: "from-[#10B981] to-[#0EA5E9]",
    bgGradient: "from-emerald-50 to-cyan-50",
  },
  {
    icon: UserCheck,
    title: "5K+ Verified Users",
    description: "Trusted by thousands of tech enthusiasts worldwide",
    gradient: "from-[#8B5CF6] to-[#EC4899]",
    bgGradient: "from-purple-50 to-pink-50",
  },
  {
    icon: Zap,
    title: "Fast Delivery",
    description: "Same-day shipping available for most products",
    gradient: "from-[#F59E0B] to-[#EF4444]",
    bgGradient: "from-amber-50 to-red-50",
  },
  {
    icon: Shield,
    title: "2-Year Warranty",
    description: "Comprehensive protection on all premium products",
    gradient: "from-[#EF4444] to-[#F59E0B]",
    bgGradient: "from-red-50 to-amber-50",
  },
  {
    icon: Globe,
    title: "Nationwide Shipping",
    description: "We deliver across the entire country",
    gradient: "from-[#0EA5E9] to-[#10B981]",
    bgGradient: "from-sky-50 to-emerald-50",
  },
];
