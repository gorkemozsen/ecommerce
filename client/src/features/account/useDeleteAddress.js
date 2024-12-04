import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAddress } from "../../services/apiAddresses";
import toast from "react-hot-toast";

export function useDeleteAddress() {
  const queryClient = useQueryClient();

  const { mutate: deleteAddressMutation, isLoading: isDeleting } = useMutation({
    mutationFn: deleteAddress, // Silme işlemini yapan fonksiyon
    onSuccess: () => {
      // Adres listesini güncelle
      queryClient.invalidateQueries(["addresses"]); // "addresses" cache'ini yeniden yükler
      toast.success("Address successfully deleted!");
    },
    onError: (err) => {
      // Hata bildirimini göster
      toast.error(`Failed to delete address: ${err.message}`);
    },
  });

  return { deleteAddress: deleteAddressMutation, isPending: isDeleting };
}
