import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    devTools: import.meta.env.MODE !== "production", // Sadece geliştirme modunda aktif
  },
});
