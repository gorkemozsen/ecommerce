import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import {
  addOrUpdateCartItem,
  findItemInCart,
  calculateTotalPrice,
} from "./cartUtils";

const localState = localStorage.getItem("cart");

const initialState = {
  items: localState ? JSON.parse(localState) : [],
  totalPrice: localState ? calculateTotalPrice(JSON.parse(localState)) : 0,
  addressId: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addItem: (state, action) => {
      const { product, quantity } = action.payload;

      try {
        state.items = addOrUpdateCartItem(state.items, product, quantity);
        state.totalPrice = calculateTotalPrice(state.items);

        localStorage.setItem("cart", JSON.stringify(state.items));
        toast.success(`Cart updated successfully!`);
      } catch (error) {
        toast.error(`Adding cart failed! ${error.message}`);
      }
    },

    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.totalPrice = calculateTotalPrice(state.items);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.addressId = null; // Sepet temizlenirken addressId de sıfırlanır
      localStorage.removeItem("cart");
    },

    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = findItemInCart(state.items, productId);

      if (item) {
        item.quantity = quantity;
        state.totalPrice = calculateTotalPrice(state.items);
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },

    addAddressId: (state, action) => {
      state.addressId = action.payload;
    },
  },
});

export const { addItem, removeItem, clearCart, updateQuantity, addAddressId } =
  cartSlice.actions;
export default cartSlice.reducer;
