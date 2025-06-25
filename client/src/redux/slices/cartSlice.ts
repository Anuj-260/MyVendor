import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VendorItem } from "../../types";

interface CartItem extends VendorItem {
  quantity: number;
}

const cartSlice = createSlice({
  name: "cart",
  initialState: [] as CartItem[],
  reducers: {
    addToCart(state, action: PayloadAction<VendorItem>) {
      const item = state.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    updateQty(state, action: PayloadAction<{ id: number; change: number }>) {
      return state
        .map((i) =>
          i.id === action.payload.id
            ? { ...i, quantity: i.quantity + action.payload.change }
            : i
        )
        .filter((i) => i.quantity > 0);
    },
    removeFromCart(state, action: PayloadAction<number>) {
      return state.filter((i) => i.id !== action.payload);
    },
  },
});

export const { addToCart, updateQty, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
