import { useMutation } from "@tanstack/react-query";
import { uploadFile } from "../services/apiAdmin";
import toast from "react-hot-toast";

export function useUpload() {
  return useMutation({
    mutationFn: uploadFile,
    onSuccess: (data) => {
      toast.success("file succesfully uploaded.", data);
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Failed to upload file.";
      toast.error(errorMessage);
    },
  });
}
