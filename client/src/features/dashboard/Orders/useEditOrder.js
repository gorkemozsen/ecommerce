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
    onError: (err) => {
      toast.warn(`Product update failed! <br /> ${err.message}`);
    },
  });

  return { editOrder, isPending };
}
