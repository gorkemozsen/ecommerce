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
      console.log("successfully logged out");
      navigate("/");
      queryClient.clear();
      toast.success("You're successfully logged out.");
      navigate("/login");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return { logout, isPending };
}
