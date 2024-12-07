import { useMutation, useQueryClient } from "@tanstack/react-query";

import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      navigate("/");
      queryClient.clear();
      toast.success("You're successfully logged out.");
      navigate("/login");
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message ||
        "An error occurred while logging out.";
      toast.error(errorMessage);
    },
  });

  return { logout, isPending };
}
