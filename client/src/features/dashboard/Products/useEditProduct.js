import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editProduct as editProductApi } from "../../../services/apiAdmin";
import { toast } from "react-hot-toast";

export function useEditProduct() {
  const queryClient = useQueryClient();

  const { mutate: editProduct, isPending } = useMutation({
    mutationFn: editProductApi,
    onSuccess: (product) => {
      queryClient.invalidateQueries(["products"]);
      toast.success("Product succesfully updated!");
    },
    onError: (err) => {
      toast.warn(`Product update failed! <br /> ${err.message}`);
    },
  });

  return { editProduct, isPending };
}
