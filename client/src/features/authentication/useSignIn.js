import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { signin as signinApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useSignIn() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: signin, isPending } = useMutation({
    mutationFn: ({ email, password }) => signinApi({ email, password }),
    onSuccess: (data) => {
      console.log("successfully signed in", data);
      toast.success("You're successfully signed in!");
      queryClient.invalidateQueries(["user"]);
      navigate("/");
    },

    onError: (error) => {
      const errorMessage =
        error.response?.data?.message ||
        "Provided email or password are incorrect";
      toast.error(errorMessage);
    },
  });

  return { signin, isPending };
}
