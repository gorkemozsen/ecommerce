import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateEmail as updateEmailApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useEmailUpdate() {
  const queryClient = useQueryClient();
  const { mutate: updateEmail, isPending } = useMutation({
    mutationFn: updateEmailApi,
    onSuccess: (res) => {
      toast.success("Email updated successfully!");
      queryClient.invalidateQueries(["user"]);
    },
    onError: (error) => {
      const errorMessage =
        error?.message || "An error occurred while updating the email.";
      toast.error(errorMessage);
    },
  });

  return { updateEmail, isPending };
}
