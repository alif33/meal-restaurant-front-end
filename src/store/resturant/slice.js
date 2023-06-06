import { createSlice } from "@reduxjs/toolkit";

export const resturantSlice = createSlice({
  name: "resturant",
  initialState: {
    restaurantList: [],
    activeResturant: null,
    sehedules:[],
    deliveryZones: [],
    activeDeliveryZones: null,
    coupons: [],
    photos: [],
    banners: [],
    cousines: [],
    liveRestaurantsList: [],
    disabledRestaurantsList: [],
    m2mRestaurantsList: [],
    temporaryPausedRestaurantsList: [],
    searchRestaurantsList: [],
    isLoading: true,
  },
  reducers: {
    setRestaurant: (state, action) => {
      return {
        ...state,
        restaurantList: action.payload,
        isLoading: false,
      };
    },

    activeResturant: (state, action) => {
      return {
        ...state,
        activeResturant: action.payload,
      };
    },

    setSchedules: (state, action) => {
      return {
        ...state,
        sehedules: action.payload,
      };
    },
    
    activeDeliveryZones: (state, action) => {
      return {
        ...state,
        activeDeliveryZones: action.payload,
      };
    },

    setDeliveryZones: (state, action) => {
      return {
        ...state,
        deliveryZones: action.payload,
      };
    },

    setCoupons: (state, action) => {
      return {
        ...state,
        coupons: action.payload
      };
    },

    setPhotos: (state, action) => {
      return {
        ...state,
        photos: action.payload
      };
    },

    setBanners: (state, action) => {
      return {
        ...state,
        banners: action.payload
      };
    },

    setCousines: (state, action) => {
      return {
        ...state,
        cousines: action.payload
      };
    },

    setLiveRestaurants: (state, action) => {
      return {
        ...state,
        liveRestaurantsList: action.payload,
        isLoading: false,
      };
    },
    setDisabledRestaurants: (state, action) => {
      return {
        ...state,
        disabledRestaurantsList: action.payload,
        isLoading: false,
      };
    },
    setM2mRestaurants: (state, action) => {
      return {
        ...state,
        m2mRestaurantsList: action.payload,
        isLoading: false,
      };
    },
    setTemporaryPausedRestaurants: (state, action) => {
      return {
        ...state,
        temporaryPausedRestaurantsList: action.payload,
        isLoading: false,
      };
    },
    setSearchRestaurants: (state, action) => {
      return {
        ...state,
        searchRestauantsList: action.payload,
        isLoading: false,
      };
    },
  },
});
