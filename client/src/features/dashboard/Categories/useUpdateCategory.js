import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCategory } from "../../../services/apiCategories";
import toast from "react-hot-toast";

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: ({ categoryId, updatedCategory }) => {
      updateCategory(categoryId, updatedCategory);
    },
    onSuccess: () => {
      // Refetch categories after updating

      queryClient.invalidateQueries(["categories"]);
      toast.success("Category successfully updated.");
    },

    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Failed to update category.";
      toast.error(errorMessage);
    },
  });

  return {
    updateCategory: mutate,
    isPending,
    error,
  };
}
