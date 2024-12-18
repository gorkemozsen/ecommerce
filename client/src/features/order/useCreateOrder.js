import { useMutation } from "@tanstack/react-query";
import { createOrder as createOrderApi } from "../../services/apiOrder";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { clearCart } from "../cart/cartSlice";
import { useDispatch } from "react-redux";

export function useCreateOrder() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutate: createOrder, isPending } = useMutation({
    mutationFn: createOrderApi,
    onSuccess: (order) => {
      dispatch(clearCart());
      toast.success("Order successfully created!");
      navigate("/");
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Failed to create order.";
      toast.error(errorMessage);
    },
  });

  return { createOrder, isPending };
}
