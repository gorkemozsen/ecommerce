import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import { useSignIn } from "./useSignIn";
import toast from "react-hot-toast";

export function useSignup() {
  const { signin } = useSignIn();

  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user, variables) => {
      signin({ email: variables.email, password: variables.password });
      toast.success("Account successfully created!");
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "An error occurred during signup.";
      toast.error(errorMessage);
    },
  });

  return { signup, isPending };
}
