import { useQuery } from "@tanstack/react-query";
import { getMyAddresses } from "../../services/apiAddresses";
import { toast } from "react-hot-toast";

export function useUserAddress() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["myAddresses"],
    queryFn: getMyAddresses,
    onSuccess: (data) => {
      toast.success("Addresses fetched successfully!");
      console.log("Fetched addresses:", data);
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to fetch addresses."
      );
      console.error("Error fetching addresses:", error.message);
    },
  });

  return { data, isPending, isError, error };
}
