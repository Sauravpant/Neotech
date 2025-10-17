import PaginationWrapper from "@/components/common/PaginationWrapper";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { OrdersHeader } from "@/components/admin/orders/OrdersHeader";
import { OrdersTable } from "@/components/admin/orders/OrdersTable";
import { useGetAllOrders } from "@/hooks/admin/useAdminOrders";
import type { GetAllOrders, Order } from "@/types/admin/order.types";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export const OrdersPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState<string>(searchParams.get("search") || "");

  const queryParams: GetAllOrders = Object.fromEntries(searchParams.entries());
  queryParams.page = queryParams.page ? Number(queryParams.page) : 1;
  queryParams.limit = queryParams.limit ? Number(queryParams.limit) : 10;

  const { data, isLoading, error, refetch } = useGetAllOrders(queryParams);

  const orders: Order[] = data?.data?.orders || [];
  const totalOrders = data?.data?.orders.length || 0;
  const totalPages = data?.data?.total || 0;

  const applyFilters = (key: string, value: string) => {
    const updated = new URLSearchParams(searchParams);
    value ? updated.set(key, value) : updated.delete(key);
    updated.set("page", "1");
    setSearchParams(updated);
  };

  const clearAllFilters = () => {
    const updated = new URLSearchParams();
    updated.set("page", "1");
    setSearchParams(updated);
  };

  const goToPage = (page: number) => {
    const updated = new URLSearchParams(searchParams);
    updated.set("page", page.toString());
    setSearchParams(updated);
  };

  if (isLoading) {
    return <LoadingScreen title="Loading orders" subtitle="Fetching orders list" />;
  }

  if (error) {
    return <ErrorMessage title="Failed to load orders" refetch={refetch} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <OrdersHeader search={search} setSearch={setSearch} totalOrders={totalOrders} applyFilters={applyFilters} clearAllFilters={clearAllFilters} />{" "}
        <div className="mb-4">
          <OrdersTable orders={orders} />
        </div>
        {totalPages > 1 && (
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <PaginationWrapper totalPages={totalPages} currentPage={queryParams.page} goToPage={goToPage} />
          </div>
        )}
      </div>
    </div>
  );
};
