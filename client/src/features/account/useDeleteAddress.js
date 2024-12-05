import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAddress } from "../../services/apiAddresses";
import toast from "react-hot-toast";

export function useDeleteAddress() {
  const queryClient = useQueryClient();

  const { mutate: deleteAddressMutation, isPending: isDeleting } = useMutation({
    mutationFn: deleteAddress,
    onSuccess: () => {
      queryClient.invalidateQueries(["addresses"]);
      toast.success("Address successfully deleted!");
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Failed to delete address.";
      toast.error(errorMessage);
    },
  });

  return { deleteAddress: deleteAddressMutation, isPending: isDeleting };
}
