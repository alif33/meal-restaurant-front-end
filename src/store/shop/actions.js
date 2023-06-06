import { getData } from "../../__lib__/helpers/HttpService";
import { shopSlice } from "./slice";
const { actions: slice } = shopSlice;

export const setShop = () => (dispatch) => {
  getData("shops").then((res) => {
    console.log(res);
    dispatch(slice.setShop(res));
  });
};

export const setLiveShop = () => (dispatch) => {
  getData("shops/live").then((res) => {
    dispatch(slice.setLiveShop(res));
  });
};
export const setDisabledShop = () => (dispatch) => {
  getData("shops/disabled").then((res) => {
    dispatch(slice.setDisabledShop(res));
  });
};
export const setM2mShop = () => (dispatch) => {
  getData("shops/m2m").then((res) => {
    dispatch(slice.setM2mShop(res));
  });
};
export const setTemporaryPausedShops = () => (dispatch) => {
  getData("shops/temporarily-paused").then((res) => {
    dispatch(slice.setTemporaryPausedShops(res));
  });
};
export const setSearchShops = (data) => (dispatch) => {
  dispatch(slice.setSearchShops(data));
};
