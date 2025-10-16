import { EmptyResult } from "@/components/ui/EmptyMessage";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { useGetMyOrders } from "@/hooks/user/useOrders";
import OrdersCard from "@/components/user/orders/OrdersCard";
import { Package, ShoppingBag } from "lucide-react";

const OrderDetailsPage = () => {
  const { data, isLoading, error, refetch } = useGetMyOrders();

  const orders = data?.data || [];

  if (isLoading) {
    return <LoadingScreen title="Loading your orders" subtitle="Fetching your orders history" />;
  }

  if (error) {
    return <ErrorMessage title="Failed to load orders" refetch={refetch} />;
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50/30 py-6 sm:py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <EmptyResult title="No orders yet" subtitle="You haven't placed any orders yet. Start shopping now!" />
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50/30 py-4 sm:py-6">
      <div className="container mx-auto px-2 sm:px-3 lg:px-4 max-w-4xl">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">My Orders</h1>
              <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                {orders.length} {orders.length === 1 ? "order" : "orders"} in your history
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="bg-white rounded-lg sm:rounded-xl p-3 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                <Package className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-base sm:text-lg font-bold text-gray-900">{orders.length}</p>
                <p className="text-[10px] sm:text-xs text-gray-600">Total</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg sm:rounded-xl p-3 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-50 rounded-lg flex items-center justify-center">
                <Package className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
              </div>
              <div>
                <p className="text-base sm:text-lg font-bold text-gray-900">{orders.filter((o) => o.status === "Delivered").length}</p>
                <p className="text-[10px] sm:text-xs text-gray-600">Delivered</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg sm:rounded-xl p-3 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-amber-50 rounded-lg flex items-center justify-center">
                <Package className="w-3 h-3 sm:w-4 sm:h-4 text-amber-600" />
              </div>
              <div>
                <p className="text-base sm:text-lg font-bold text-gray-900">
                  {orders.filter((o) => o.status === "Pending" || o.status === "Processing").length}
                </p>
                <p className="text-[10px] sm:text-xs text-gray-600">Active</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg sm:rounded-xl p-3 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-50 rounded-lg flex items-center justify-center">
                <Package className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" />
              </div>
              <div>
                <p className="text-base sm:text-lg font-bold text-gray-900">{orders.filter((o) => o.status === "Cancelled").length}</p>
                <p className="text-[10px] sm:text-xs text-gray-600">Cancelled</p>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-3 sm:space-y-4">
          {orders.map((order) => (
            <OrdersCard key={order._id} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
