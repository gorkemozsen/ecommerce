import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../../services/apiShop";

export function useSingleProduct(productId) {
  const { isPending, data, error } = useQuery({
    queryKey: ["products", productId],
    queryFn: () => getProductById(productId),
    enabled: !!productId,
  });

  return { isPending, error, product: data };
}
