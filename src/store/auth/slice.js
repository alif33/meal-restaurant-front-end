import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: "",
    isAuthenticated: false,
  },
  reducers: {
    LogedIn: (state, action) => {
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token
      };
    },

    LogedOut: (state, action) => {
      return {
        ...state,
        isAuthenticated: false,
        token: ""
      };
    },
  },
});