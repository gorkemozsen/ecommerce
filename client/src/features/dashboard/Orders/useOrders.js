import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getOrders } from "../../../services/apiOrder";
import { useQueryParams } from "../../../hooks/useQueryParams";
import { prefetchPage } from "../../../hooks/prefetchPage";

export function useOrders() {
  const { filter, sortBy, query, page, limit } = useQueryParams("status");

  const queryClient = useQueryClient();

  const { isPending, data, error } = useQuery({
    queryKey: ["orders", page, filter, sortBy, query],
    queryFn: () => getOrders({ page, limit, filter, sortBy, query }),
    keepPreviousData: true,
  });

  if (data?.totalPages)
    prefetchPage({
      queryClient,
      page,
      limit,
      filter,
      sortBy,
      query,
      totalPages: data?.totalPages,
      getPagesFn: getOrders,
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
