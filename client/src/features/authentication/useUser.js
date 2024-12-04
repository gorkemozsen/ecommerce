import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUser } from "../../services/apiAuth";
import { useEffect } from "react";

export function useUser() {
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading: isPending,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: false,
    staleTime: 0,
  });

  useEffect(() => {
    if (error?.message === "Unauthorized") {
      queryClient.invalidateQueries(["user"]);
      localStorage.removeItem("accessToken");
    }
  }, [error, queryClient]);

  return { user, isPending, error };
}
