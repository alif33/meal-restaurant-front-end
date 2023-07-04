import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: "",
    isAuthenticated: false,
    user: null
  },
  reducers: {
    LogedIn: (state, action) => {
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        user: action.payload.user
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