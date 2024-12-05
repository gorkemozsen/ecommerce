import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { cancelOrder as cancelOrderApi } from "../../services/apiOrder";

export function useCancelOrder() {
  const queryClient = useQueryClient();

  const { mutate: cancelOrder, isPending } = useMutation({
    mutationFn: cancelOrderApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
      toast.success("Order succesfully cancelled!");
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Failed to cancel order.";
      toast.error(errorMessage);
    },
  });

  return { cancelOrder, isPending };
}
