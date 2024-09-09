import { createSlice } from "@reduxjs/toolkit";

const loadCartFromLocalStorage = () => {
  const cartData = localStorage.getItem("cart");
  return cartData ? JSON.parse(cartData) : { items: [] };
};

const saveCartToLocalStorage = (state) => {
  localStorage.setItem("cart", JSON.stringify(state));
};

const cartSlice = createSlice({
  name: "cart",
  initialState: loadCartFromLocalStorage(),
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.pid === item.pid);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
      saveCartToLocalStorage(state);
    },
    increaseItem: (state, action) => {
      const { pid } = action.payload;
      const item = state.items.find((i) => i.pid === pid);
      if (item) {
        item.quantity += 1;
        saveCartToLocalStorage(state);
      }
    },
    decreaseItem: (state, action) => {
      const { pid } = action.payload;
      const item = state.items.find((i) => i.pid === pid);
      if (item) {
        item.quantity -= 1;
        if (item.quantity <= 0) {
          state.items = state.items.filter((i) => i.pid !== pid);
        }
        saveCartToLocalStorage(state);
      }
    },
    clearCart: (state) => {
      state.items = [];
      saveCartToLocalStorage(state);
    },
  },
});

export const { addItem, increaseItem, decreaseItem, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
