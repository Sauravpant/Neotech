import { DollarSign, Package, Users, ShoppingCart } from "lucide-react";

interface StatsHeaderProps {
  totalSales: number;
  pendingSales: number;
  totalProducts: number;
  totalUsers: number;
  totalOrders: number;
}

const StatsHeader: React.FC<StatsHeaderProps> = ({ totalSales, pendingSales, totalProducts, totalUsers, totalOrders }) => {
  const stats = [
    {
      title: "Total Revenue",
      value: `$${totalSales.toLocaleString()}`,
      icon: DollarSign,
      color: "green",
      subtitle: "All time",
    },
    {
      title: "Pending Revenue",
      value: `$${pendingSales.toLocaleString()}`,
      icon: DollarSign,
      color: "amber",
      subtitle: "Awaiting payment",
    },
    {
      title: "Total Products",
      value: totalProducts.toLocaleString(),
      icon: Package,
      color: "blue",
      subtitle: "Across categories",
    },
    {
      title: "Total Users",
      value: totalUsers.toLocaleString(),
      icon: Users,
      color: "purple",
      subtitle: "Registered users",
    },
    {
      title: "Total Orders",
      value: totalOrders.toLocaleString(),
      icon: ShoppingCart,
      color: "indigo",
      subtitle: "All orders",
    },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      green: "bg-green-100 text-green-600",
      amber: "bg-amber-100 text-amber-600",
      blue: "bg-blue-100 text-blue-600",
      purple: "bg-purple-100 text-purple-600",
      indigo: "bg-indigo-100 text-indigo-600",
    };
    return colors[color as keyof typeof colors] || colors.green;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="bg-white p-3 sm:p-4 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm text-gray-600 font-medium truncate">{stat.title}</p>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mt-1 truncate">{stat.value}</p>
                <p className="text-xs text-gray-500 font-medium mt-1 truncate">{stat.subtitle}</p>
              </div>
              <div
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 ml-3 ${getColorClasses(stat.color)}`}
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsHeader;
