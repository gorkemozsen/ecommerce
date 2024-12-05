import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editAddress } from "../../services/apiAddresses";
import toast from "react-hot-toast";

export function useEditAddress() {
  const queryClient = useQueryClient();

  const { mutate: editAddressMutation, isPending } = useMutation({
    mutationFn: editAddress,
    onSuccess: (updatedAddress) => {
      queryClient.invalidateQueries(["addresses"]);
      toast.success("Address successfully updated!");
    },

    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Failed to update address.";
      toast.error(errorMessage);
    },
  });

  return { editAddress: editAddressMutation, isPending };
}
