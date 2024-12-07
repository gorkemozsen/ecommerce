import { useQuery } from "@tanstack/react-query";
import { getMyAddresses } from "../../services/apiAddresses";
import { toast } from "react-hot-toast";

export function useUserAddress() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["myAddresses"],
    queryFn: getMyAddresses,
    onSuccess: (data) => {
      toast.success("Addresses fetched successfully!");
    },

    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch addresses.";
      toast.error(errorMessage);
    },
  });

  return { data, isPending, isError, error };
}
