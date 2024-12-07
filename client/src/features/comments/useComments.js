import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllComments } from "../../services/apiComments";
import { useQueryParams } from "../../hooks/useQueryParams";
import { prefetchPage } from "../../hooks/prefetchPage";

export function useComments() {
  const queryClient = useQueryClient();

  const { filter, sortBy, page, limit, query } = useQueryParams();

  const { isPending, data, error } = useQuery({
    queryKey: ["comments", page, filter, sortBy, query],
    queryFn: () => getAllComments({ page, limit, filter, sortBy, query }),
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
      getPagesFn: getAllComments,
      queryKeyStr: "comments",
    });

  return {
    isPending,
    error,
    comments: data?.data,
    numResults: data?.totalItems,
    numPages: data?.totalPages,
    currentPage: data?.currentPage,
  };
}
