import { createSlice } from "@reduxjs/toolkit";

export const menuSlice = createSlice({
  name: "menu",
  initialState: {
    categories: []
  },
  reducers: {
    setCategories: (state, action) => {
      return {
        ...state,
        categories: action.payload
      };
    }
  }
});
