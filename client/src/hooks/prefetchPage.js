export function prefetchPage({
  queryClient,
  page,
  limit,
  filter,
  sortBy,
  query = "",
  totalPages,
  getPagesFn,
  queryKeyStr,
}) {
  if (page < totalPages)
    queryClient.prefetchQuery({
      queryKey: [queryKeyStr, page + 1, filter, sortBy, query],
      queryFn: () =>
        getPagesFn({
          page: page + 1,
          limit,
          filter,
          sortBy,
          query,
        }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: [queryKeyStr, page - 1, filter, sortBy, query],
      queryFn: () =>
        getPagesFn({
          page: page - 1,
          limit,
          filter,
          sortBy,
          query,
        }),
    });
}
