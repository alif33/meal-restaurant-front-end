import { getData } from "../../__lib__/helpers/HttpService";
import { scheduleSlice } from "./slice";
const { actions: slice } = scheduleSlice;

export const setSchedule = (getUrl) => (dispatch) => {
  getData(getUrl).then((res) => {
    dispatch(slice.setSchedule(res));
  });
};

export const setSpecialHour = (getUrl) => (dispatch) => {
  getData(getUrl).then((res) => {
    dispatch(slice.setSpecialHour(res));
  });
};
export const setClosure = (getUrl) => (dispatch) => {
  getData(getUrl).then((res) => {
    dispatch(slice.setClosure(res));
  });
};
