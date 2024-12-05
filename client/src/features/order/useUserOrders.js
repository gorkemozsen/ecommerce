import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserOrders } from "../../services/apiOrder";
import { useQueryParams } from "../../hooks/useQueryParams";
import { prefetchPage } from "../../hooks/prefetchPage";

export function useUserOrders() {
  const { filter, sortBy, page, limit, query } = useQueryParams("status");

  const queryClient = useQueryClient();

  const { isPending, data, error } = useQuery({
    queryKey: ["orders", page, filter, sortBy, query],
    queryFn: () => getUserOrders({ page, limit, filter, sortBy, query }),
    keepPreviousData: true,
  });

  // Pre-fetching
  prefetchPage({
    queryClient,
    page,
    limit,
    filter,
    sortBy,
    query,
    totalPages: data?.totalPages,
    getPagesFn: getUserOrders,
    queryKeyStr: "orders",
  });

  return {
    isPending,
    error,
    orders: data?.data,
    numResults: data?.totalItems,
    numPages: data?.totalPages,
    currentPage: data?.currentPage,
  };
}
