import {  BarChartCard, RadarChartCard } from "@/components/common/StatCards";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { useGetDashboardStats } from "@/hooks/admin/useDashboard";
import StatsHeader from "@/components/admin/dashboard/DashboardHeader";

const allStatuses = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

const DashboardPage = () => {
  const { data: dashboardData, isLoading, error, refetch } = useGetDashboardStats();

  const orderStats = dashboardData?.data.orderStats;
  const userStats = dashboardData?.data.userStats;
  const categoryStats = dashboardData?.data.category;

  const totalCategory = categoryStats?.length || 0;
  const productsByCategory = categoryStats?.map((category) => ({ name: category.name, value: category.totalProducts })) || [];
  const users = [
    { name: "Total", value: userStats?.totalUsers || 0 },
    { name: "Active", value: (userStats?.totalUsers || 0) - (userStats?.deactivatedUsers || 0) },
    { name: "Verified", value: userStats?.verifiedUsers || 0 },
    { name: "Unverified", value: userStats?.unverifiedUsers || 0 },
  ];
  const totalProducts = categoryStats?.reduce((acc, category) => acc + category.totalProducts, 0) || 0;
  const totalUsers = userStats?.totalUsers || 0;
  const ordersByStatus = allStatuses.map((status) => {
    const foundStatus = orderStats?.ordersByStatus.find((s) => s._id === status);
    return { name: status, value: foundStatus ? foundStatus.count : 0 };
  });
  const totalOrders = orderStats?.totalOrders || 0;
  const totalSales = orderStats?.totalSales || 0;
  const pendingSales = orderStats?.pendingSales || 0;

  if (isLoading) {
    return <LoadingScreen title="Loading dashboard data" subtitle="Fetching the dashboard stats" />;
  }

  if (error) {
    return <ErrorMessage title="Failed to load data" refetch={refetch} />;
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <StatsHeader
        totalSales={totalSales}
        pendingSales={pendingSales}
        totalProducts={totalProducts}
        totalUsers={totalUsers}
        totalOrders={totalOrders}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        <BarChartCard data={users} total={totalUsers} title="Users Overview" />
        <RadarChartCard data={productsByCategory} title="Category Overview" total={totalCategory} />
        <BarChartCard data={ordersByStatus} total={totalOrders} title="Orders Overview" />
      </div>
    </div>
  );
};

export default DashboardPage;
