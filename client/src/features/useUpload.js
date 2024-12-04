import { useMutation } from "@tanstack/react-query";
import { uploadFile } from "../services/apiAdmin";

export function useUpload() {
  return useMutation({
    mutationFn: uploadFile,
    onSuccess: (data) => {
      console.log("file succesfully uploaded.", data);
    },
    onError: (error) => {
      console.log("file upload failed.", error);
    },
  });
}
