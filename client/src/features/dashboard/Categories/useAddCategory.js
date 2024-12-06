import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCategory } from "../../../services/apiCategories";
import toast from "react-hot-toast";

export function useAddCategory() {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: (newCategory) => addCategory(newCategory),
    onSuccess: () => {
      // Refetch categories after adding a new one
      queryClient.invalidateQueries(["categories"]);
      toast.success("Category successfully created!");
    },

    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Failed to create category.";
      toast.error(errorMessage);
    },
  });

  return {
    addCategory: mutate,
    isPending,
    error,
  };
}
