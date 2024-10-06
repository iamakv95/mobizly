import { createSlice } from "@reduxjs/toolkit";

const subcategorySlice = createSlice({
  name: "subcategory",
  initialState: {
    title: "",
  },
  reducers: {
    setSubcategoryTitle: (state, action) => {
      state.title = action.payload;
    },
  },
});

export const { setSubcategoryTitle } = subcategorySlice.actions;

export default subcategorySlice.reducer;
