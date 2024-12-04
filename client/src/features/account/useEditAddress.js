import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editAddress } from "../../services/apiAddresses";
import toast from "react-hot-toast";

export function useEditAddress() {
  const queryClient = useQueryClient();

  const { mutate: editAddressMutation, isPending } = useMutation({
    mutationFn: editAddress,
    onSuccess: (updatedAddress) => {
      // Adres listesini ve cache'i güncelle
      queryClient.invalidateQueries(["addresses"]);
      toast.success("Address successfully updated!");
    },
    onError: (err) => {
      toast.error(`Failed to update address: ${err.message}`);
    },
  });

  return { editAddress: editAddressMutation, isPending };
}
