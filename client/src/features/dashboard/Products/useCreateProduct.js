import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct as createProductApi } from "../../../services/apiAdmin";
import toast from "react-hot-toast";

export function useCreateProduct() {
  const queryClient = useQueryClient();

  const { mutate: createProduct, isPending } = useMutation({
    mutationFn: createProductApi,
    onSuccess: (product) => {
      queryClient.invalidateQueries(["products"]);
      toast.success("Product succesfully created!");
    },

    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Product create failed!";
      toast.error(errorMessage);
    },
  });

  return { createProduct, isPending };
}
