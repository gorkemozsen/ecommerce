import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editOrder as editOrderApi } from "../../../services/apiAdmin";
import { toast } from "react-hot-toast";

export function useEditOrder() {
  const queryClient = useQueryClient();

  const { mutate: editOrder, isPending } = useMutation({
    mutationFn: editOrderApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
      toast.success("Order succesfully updated!");
    },

    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Product update failed!";
      toast.error(errorMessage);
    },
  });

  return { editOrder, isPending };
}
