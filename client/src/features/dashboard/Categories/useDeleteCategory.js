import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategory } from "../../../services/apiCategories";
import toast from "react-hot-toast";

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  const { mutate, isPEnding, error } = useMutation({
    mutationFn: (categoryId) => deleteCategory(categoryId),
    onSuccess: () => {
      // Refetch categories after deletion
      queryClient.invalidateQueries(["categories"]);
      toast.success("Category successfully deleted.");
    },

    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Failed to delete category.";
      toast.error(errorMessage);
    },
  });

  return {
    deleteCategory: mutate,
    isPEnding,
    error,
  };
}
