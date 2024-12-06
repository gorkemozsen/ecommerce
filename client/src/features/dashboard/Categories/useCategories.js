import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../../../services/apiCategories";

export function useCategories() {
  const { isPending, data, error } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getAllCategories(),
  });

  return {
    isPending,
    error,
    categories: data,
  };
}
