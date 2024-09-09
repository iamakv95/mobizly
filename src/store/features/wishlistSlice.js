import { createSlice } from "@reduxjs/toolkit";

const loadWishlistFromLocal = () => {
  const wishlistItems = localStorage.getItem("wishlist");
  const loadedItems = wishlistItems ? JSON.parse(wishlistItems) : { items: [] };
  console.log("Loaded wishlist from local storage:", loadedItems);
  return loadedItems;
};

const saveWishlistToLocal = (state) => {
  localStorage.setItem("wishlist", JSON.stringify(state));
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: loadWishlistFromLocal(),
  reducers: {
    addItem: (state, action) => {
      const itemExist = state.items.some(
        (item) => item.pid === action.payload.pid
      );
      if (!itemExist) {
        state.items.push(action.payload);
        console.log("Item added to wishlist:", action.payload);
        saveWishlistToLocal(state);
      } else {
        console.log("Item already in wishlist:", action.payload);
      }
    },
    removeItem: (state, action) => {
      const itemToRemove = action.payload.pid;
      state.items = state.items.filter((item) => item.pid !== itemToRemove);
      console.log("Item removed from wishlist:", itemToRemove);
      saveWishlistToLocal(state);
    },
    clearWishlist: (state) => {
      state.items = [];
      console.log("Wishlist cleared.");
      saveWishlistToLocal(state);
    },
  },
});

export const { addItem, removeItem, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
