import { createSlice } from "@reduxjs/toolkit";

export const shopSlice = createSlice({
  name: "shop",
  initialState: {
    shopList: [],
    liveShopList: [],
    disabledShopList: [],
    m2mShopList: [],
    temporaryPausedShopList: [],
    searchShopList: [],
    isLoading: true,
  },
  reducers: {
    setShop: (state = initialState, action) => {
      return {
        ...state,
        shopList: action.payload,
        isLoading: false,
      };
    },
    setLiveShop: (state = initialState, action) => {
      return {
        ...state,
        liveShopList: action.payload,
        isLoading: false,
      };
    },
    setDisabledShop: (state = initialState, action) => {
      return {
        ...state,
        disabledShopList: action.payload,
        isLoading: false,
      };
    },
    setM2mShop: (state = initialState, action) => {
      return {
        ...state,
        m2mShopList: action.payload,
        isLoading: false,
      };
    },
    setTemporaryPausedShops: (state = initialState, action) => {
      return {
        ...state,
        temporaryPausedShopList: action.payload,
        isLoading: false,
      };
    },
    setSearchShops: (state = initialState, action) => {
      return {
        ...state,
        searchShopList: action.payload,
        isLoading: false,
      };
    },
  },
});
