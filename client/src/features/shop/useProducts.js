import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProducts } from "../../services/apiShop";
import { useQueryParams } from "../../hooks/useQueryParams";
import { prefetchPage } from "../../hooks/prefetchPage";

export function useProducts() {
  const queryClient = useQueryClient();

  const { filter, sortBy, page, limit, query } = useQueryParams("stock");

  const { isPending, data, error } = useQuery({
    queryKey: ["products", page, filter, sortBy, query],
    queryFn: () => getProducts({ page, limit, filter, sortBy, query }),
    keepPreviousData: true,
  });

  // Pre-fetching
  if (data?.totalPages)
    prefetchPage({
      queryClient,
      page,
      limit,
      filter,
      sortBy,
      query,
      totalPages: data?.totalPages,
      getPagesFn: getProducts,
      queryKeyStr: "products",
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
