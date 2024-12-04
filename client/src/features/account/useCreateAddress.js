import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewAddress } from "../../services/apiAddresses";
import toast from "react-hot-toast";

export function useCreateAddress() {
  const queryClient = useQueryClient();

  const { mutate: createAddressMutaion, isPending } = useMutation({
    mutationFn: createNewAddress,
    onSuccess: (address) => {
      // Adresler listesini yenile
      queryClient.invalidateQueries(["addresses"]);
      // Başarılı bildirim
      toast.success("Address successfully created!");
    },
    onError: (err) => {
      // Hata bildirim
      toast.error(`Failed to create address: ${err.message}`);
    },
  });

  return { createAddress: createAddressMutaion, isPending };
}
