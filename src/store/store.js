import { configureStore } from "@reduxjs/toolkit";
import { flipkartAPI } from "./services/flipkartAPI";
import cartReducer from "./features/cartSlice";
import wishlistReducer from "./features/wishlistSlice";

export const store = configureStore({
  reducer: {
    [flipkartAPI.reducerPath]: flipkartAPI.reducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these paths from the serializable check non sanetized value error disable
        ignoredActions: [flipkartAPI.util.resetApiState.type],
        ignoredPaths: ["flipkartAPI"],
      },
    }).concat(flipkartAPI.middleware),
});
