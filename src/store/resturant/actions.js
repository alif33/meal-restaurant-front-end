import { getData, _getData } from "../../__lib__/helpers/HttpService";
import { resturantSlice } from "./slice";
const { actions: slice } = resturantSlice;

export const setRestaurant = (token) => (dispatch) => {
  _getData("/restaurants", token).then((res) => {
    if (res) {
      dispatch(slice.setRestaurant(res));
    }
  });
};

export const activeResturant = (resturant) => (dispatch) => {
  dispatch(slice.activeResturant(resturant));
};

export const setSchedules = (_id, token) => (dispatch) => {
  _getData(`/restaurant/schedules?rid=${_id}`, token)
  .then((res) => {
    if (res) {
      console.log(res);
      dispatch(slice.setSchedules(res));
    }
  });
};

export const activeDeliveryZones = (_id) => (dispatch) => {
  dispatch(slice.activeDeliveryZones(_id));
};

export const setDeliveryZones = (_id, token) => (dispatch) => {
  _getData(`/restaurant/delivery-zones?_rid=${_id}`, token).then((res) => {
    if (res) {
      dispatch(slice.setDeliveryZones(res));
    }
  });
};

export const setCoupons = (_id, token) => (dispatch) => {
  _getData(`/restaurant/coupons?_rid=${_id}`, token).then((res) => {
    if (res) {
      dispatch(slice.setCoupons(res));
    }
  });
};

export const setPhotos = (_rid, token) => (dispatch) => {
  _getData(`/restaurant/photos?_rid=${_rid}&type=PHOTO`, token).then((res) => {
    if (res) {
      dispatch(slice.setPhotos(res));
    }
  });
};

export const setBanners = (_rid, token) => (dispatch) => {
  _getData(`/restaurant/photos?_rid=${_rid}&type=BANNER`, token).then((res) => {
    if (res) {
      dispatch(slice.setBanners(res));
    }
  });
};

export const setCousines = (_id, token) => (dispatch) => {
  _getData(`/restaurant/cuisine-types?_id=${_id}`, token)
  .then((res) => {
    if (res) {
      dispatch(slice.setCousines(res));
    }
  });
};

export const setLiveShop = () => (dispatch) => {
  getData("restaurants/live").then((res) => {
    dispatch(slice.setLiveShop(res));
  });
};
export const setDisabledShop = () => (dispatch) => {
  getData("restaurants/disabled").then((res) => {
    dispatch(slice.setDisabledShop(res));
  });
};
export const setM2mShop = () => (dispatch) => {
  getData("restaurants/m2m").then((res) => {
    dispatch(slice.setM2mShop(res));
  });
};
export const setTemporaryPausedrestaurants = () => (dispatch) => {
  getData("restaurants/temporarily-paused").then((res) => {
    dispatch(slice.setTemporaryPausedrestaurants(res));
  });
};
export const setSearchrestaurants = (data) => (dispatch) => {
  dispatch(slice.setSearchrestaurants(data));
};
