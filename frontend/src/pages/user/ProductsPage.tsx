import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { SearchContext } from "@/context/SearchContext";
import FiltersSidebar from "@/components/sidebar/ProductsFilterSidebar";
import ProductsGrid from "@/components/user/product/ProductsGrid";
import ProductsHeader from "@/components/user/product/ProductsHeader";
import { useGetAllProducts } from "@/hooks/user/useProducts";
import type { ProductParams } from "@/types/common/product.types";

const Products = () => {
  const { search } = useContext(SearchContext)!;
  const [searchParams, setSearchParams] = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  const queryParams: ProductParams = Object.fromEntries(searchParams.entries()) as ProductParams;
  queryParams.page = queryParams.page || 1;
  queryParams.limit = queryParams.limit || 10;

  useEffect(() => {
    const updated = new URLSearchParams(searchParams);
    if (debouncedSearch) updated.set("name", debouncedSearch);
    else updated.delete("name");
    updated.set("page", "1");
    setSearchParams(updated);
  }, [debouncedSearch]);

  //Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 800); // 800ms debounce
    return () => clearTimeout(handler);
  }, [search]);

  const { data, fetchNextPage, hasNextPage, isLoading, error, refetch } = useGetAllProducts(queryParams);

  const updateFilters = (filter: string, value: string | number | undefined) => {
    const updated = new URLSearchParams(searchParams);
    if (value) updated.set(filter, String(value));
    else updated.delete(filter);
    updated.set("page", "1");
    setSearchParams(updated);
  };

  const clearAllFilters = () => {
    const updated = new URLSearchParams();
    updated.set("page", "1");
    updated.set("limit", "10");
    setSearchParams(updated);
  };

  return (
    <div className="min-h-screen py-8 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4">
        <ProductsHeader queryParams={queryParams} filtersOpen={filtersOpen} setFiltersOpen={setFiltersOpen} />
        <div className="flex flex-col md:flex-row gap-6">
          <FiltersSidebar queryParams={queryParams} updateFilters={updateFilters} filtersOpen={filtersOpen} clearAllFilters={clearAllFilters} />

          <div className="flex-1">
            <InfiniteScroll
              dataLength={data?.pages.flatMap((p) => p.products).length || 0}
              next={fetchNextPage}
              hasMore={!!hasNextPage}
              loader={<p className="text-center py-4">Loading...</p>}
              scrollThreshold={0.7}
            >
              <ProductsGrid products={data?.pages.flatMap((p) => p.products)} isLoading={isLoading} error={error} refetch={refetch} />
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
