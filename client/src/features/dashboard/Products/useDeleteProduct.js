import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct as deleteProductApi } from "../../../services/apiAdmin";
import toast from "react-hot-toast";
export function useDeleteProduct() {
  const queryClient = useQueryClient();

  const { mutate: deleteProduct, isPending } = useMutation({
    mutationFn: deleteProductApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      toast.success(`Product succesfully deleted.`);
    },
    onError: (err) => {
      toast.warn(`Product delete failed! <br /> ${err.message}`);
    },
  });

  return { deleteProduct, isPending };
}
