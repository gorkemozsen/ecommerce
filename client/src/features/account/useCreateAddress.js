import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewAddress } from "../../services/apiAddresses";
import toast from "react-hot-toast";

export function useCreateAddress() {
  const queryClient = useQueryClient();

  const { mutate: createAddressMutaion, isPending } = useMutation({
    mutationFn: createNewAddress,
    onSuccess: (address) => {
      queryClient.invalidateQueries(["addresses"]);
      toast.success("Address successfully created!");
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Failed to create address.";
      toast.error(errorMessage);
    },
  });

  return { createAddress: createAddressMutaion, isPending };
}
