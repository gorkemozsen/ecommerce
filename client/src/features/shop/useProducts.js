import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProducts } from "../../services/apiShop";
import { useSearchParams } from "react-router-dom";

export function useProducts() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // Filter
  const filterValueRaw = searchParams.get("stock");
  const [operator = "eq", filterValue = "all"] =
    filterValueRaw?.split(":") || [];

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "stock", value: filterValue, operator };

  // Sort
  const sortedByRaw = searchParams.get("sortBy") || "price-desc";
  const [field, direction] = sortedByRaw.split("-");
  const sortBy = { field, direction };

  // Query (search for keyword in name and description)
  const query = searchParams.get("query")?.trim() || null;

  // Pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const limit = !searchParams.get("limit")
    ? 10
    : Number(searchParams.get("limit"));

  const { isPending, data, error } = useQuery({
    queryKey: ["products", page, filter, sortBy, query],
    queryFn: () => getProducts({ page, limit, filter, sortBy, query }),
    keepPreviousData: true,
  });

  // Pre-fetching
  if (page < data?.totalPages)
    queryClient.prefetchQuery({
      queryKey: ["products", page + 1, filter, sortBy, query],
      queryFn: () =>
        getProducts({ page: page + 1, limit, filter, sortBy, query }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["products", page - 1, filter, sortBy, query],
      queryFn: () =>
        getProducts({ page: page - 1, limit, filter, sortBy, query }),
    });

  return {
    isPending,
    error,
    products: data?.data,
    numResults: data?.totalItems,
    numPages: data?.totalPages,
    currentPage: data?.currentPage,
  };
}
