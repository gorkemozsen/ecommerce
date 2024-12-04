import { useMutation } from "@tanstack/react-query";
import { updatePassword as updatePasswordApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function usePassUpdate() {
  const { mutate: updatePassword, isPending } = useMutation({
    mutationFn: updatePasswordApi,
    onSuccess: (res) => {
      toast.success("Password updated successfully! Please login");
    },
    onError: (error) => {
      const errorMessage =
        error?.message || "An error occurred while updating the password.";
      toast.error(errorMessage);
    },
  });

  return { updatePassword, isPending };
}
