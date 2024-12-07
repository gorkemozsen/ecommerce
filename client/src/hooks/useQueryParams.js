import { useSearchParams } from "react-router-dom";

export function useQueryParams(param) {
  const [searchParams] = useSearchParams();

  // Filter
  const filterValueRaw = searchParams.get(param);
  const [operator = "eq", filterValue = "all"] =
    filterValueRaw?.split(":") || [];
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: param, value: filterValue, operator };

  // Sort
  const sortedByRaw = searchParams.get("sortBy") || "id-desc";
  const [field, direction] = sortedByRaw.split("-");
  const sortBy = { field, direction };

  // Query
  const query = searchParams.get("query") || "";

  // Pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const limit = !searchParams.get("limit")
    ? 9
    : Number(searchParams.get("limit"));

  return { filter, sortBy, query, page, limit };
}
