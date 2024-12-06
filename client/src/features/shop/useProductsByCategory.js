import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useQueryParams } from "../../hooks/useQueryParams";
import { getProductsByCategory } from "../../services/apiShop";
import { prefetchPage } from "../../hooks/prefetchPage";

export function useProductsByCategory(categoryId) {
  const queryClient = useQueryClient();

  const { filter, sortBy, page, limit, query } = useQueryParams("stock");

  const { isPending, data, error } = useQuery({
    queryKey: ["products", page, filter, sortBy, query],
    queryFn: () =>
      getProductsByCategory({ page, limit, filter, sortBy, query, categoryId }),
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
      getPagesFn: getProductsByCategory,
      queryKeyStr: "products",
    });

  console.log(data);

  return {
    isPending,
    error,
    products: data?.products,
    numResults: data?.totalItems,
    numPages: data?.totalPages,
    currentPage: data?.currentPage,
  };
}
