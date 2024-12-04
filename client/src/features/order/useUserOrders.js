import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getUserOrders } from "../../services/apiOrder";
import { useUser } from "../authentication/useUser";

export function useUserOrders() {
  const { user } = useUser();
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

  // Pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const limit = !searchParams.get("limit")
    ? 10
    : Number(searchParams.get("limit"));

  const { isPending, data, error } = useQuery({
    queryKey: ["orders", page, filter, sortBy],
    queryFn: () => getUserOrders({ page, limit, filter, sortBy }),
    keepPreviousData: true,
  });

  // Pre-fetching
  if (page < data?.totalPages) {
    queryClient.prefetchQuery({
      queryKey: ["orders", page + 1, filter, sortBy],
      queryFn: () => getUserOrders({ page: page + 1, limit, filter, sortBy }),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["orders", page - 1, filter, sortBy],
      queryFn: () => getUserOrders({ page: page - 1, limit, filter, sortBy }),
      enabled: !!user,
    });
  }

  return {
    isPending,
    error,
    orders: data?.data,
    numResults: data?.totalItems,
    numPages: data?.totalPages,
    currentPage: data?.currentPage,
  };
}
