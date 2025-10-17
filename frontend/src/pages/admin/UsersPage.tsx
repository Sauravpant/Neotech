import PaginationWrapper from "@/components/common/PaginationWrapper";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { UsersHeader } from "@/components/admin/user/UsersHeader";
import { useGetAllUsers } from "@/hooks/admin/useAdminUsers";
import { UsersTable } from "@/components/admin/user/UserTable";
import type { GetUser, UserDetails } from "@/types/admin/user.types";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const UsersPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState<string>(searchParams.get("search") || "");

  const queryParams: GetUser = Object.fromEntries(searchParams.entries());
  queryParams.page = queryParams.page ? Number(queryParams.page) : 1;
  queryParams.limit = queryParams.limit ? Number(queryParams.limit) : 10;

  const { data, isLoading, isError, refetch } = useGetAllUsers(queryParams);

  const applyFilters = (key: string, value: string) => {
    const updated = new URLSearchParams(searchParams);
    value ? updated.set(key, value) : updated.delete(key);
    updated.set("page", "1");
    setSearchParams(updated);
  };

  const goToPage = (page: number) => {
    const updated = new URLSearchParams(searchParams);
    updated.set("page", page.toString());
    setSearchParams(updated);
  };

  // Debouncing for search input (800ms delay)
  useEffect(() => {
    const timerDelay = setTimeout(() => {
      applyFilters("search", search);
    }, 800);

    return () => clearTimeout(timerDelay);
  }, [search]);

  const users: UserDetails[] = data?.data?.users || [];
  const totalPages = data?.data?.total || 0;

  if (isLoading) {
    return <LoadingScreen title="Loading your users" subtitle="Fetching your users list" />;
  }

  if (isError) {
    return <ErrorMessage title="Failed to load users" refetch={refetch} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <UsersHeader search={search} setSearch={setSearch} />

        <div className="mb-4">
          <UsersTable users={users} />
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

export default UsersPage;
