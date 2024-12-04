import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getOrders } from "../../../services/apiOrder";
import { useSearchParams } from "react-router-dom";

export function useOrders() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // Filter
  const filterValueRaw = searchParams.get("status");
  const [operator = "eq", filterValue = "all"] =
    filterValueRaw?.split(":") || [];

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue, operator };

  // Sort
  const sortedByRaw = searchParams.get("sortBy") || "total-desc";
  const [field, direction] = sortedByRaw.split("-");
  const sortBy = { field, direction };

  // Query (search keyword for name or description)
  const query = searchParams.get("query") || "";

  // Pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const limit = !searchParams.get("limit")
    ? 10
    : Number(searchParams.get("limit"));

  const { isPending, data, error } = useQuery({
    queryKey: ["orders", page, filter, sortBy, query],
    queryFn: () => getOrders({ page, limit, filter, sortBy, query }),

    keepPreviousData: true,
  });

  // Pre-fetching
  if (page < data?.totalPages)
    queryClient.prefetchQuery({
      queryKey: ["orders", page + 1, filter, sortBy, query],
      queryFn: () =>
        getOrders({
          page: page + 1,
          limit,
          filter,
          sortBy,
          query,
        }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["orders", page - 1, filter, sortBy, query],
      queryFn: () =>
        getOrders({
          page: page - 1,
          limit,
          filter,
          sortBy,
          query,
        }),
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
