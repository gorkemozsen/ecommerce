import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllCategories } from "../../../services/apiCategories";
import { useQueryParams } from "../../../hooks/useQueryParams";
import { prefetchPage } from "../../../hooks/prefetchPage";

export function useCategories() {
  const queryClient = useQueryClient();

  const { filter, sortBy, page, limit, query } = useQueryParams("category");

  const { isPending, data, error } = useQuery({
    queryKey: ["categories", page, filter, sortBy, query],
    queryFn: () => getAllCategories({ page, limit, filter, sortBy, query }),
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
      getPagesFn: getAllCategories,
      queryKeyStr: "categories",
    });

  return {
    isPending,
    error,
    categories: data?.data?.rows,
    numResults: data?.totalItems,
    numPages: data?.totalPages,
    currentPage: data?.currentPage,
  };
}
