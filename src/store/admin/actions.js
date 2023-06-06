import { adminSlice } from "./slice";
const { actions: slice } = adminSlice;
// import Cookies from 'universal-cookie';
// const cookies = new Cookies();

export const adminLogin = (token) => (dispatch) => {
  cookies.set("__MT__", token, { path: '/' });
  dispatch(slice.adminLogin(token))
}

export const adminLogout = () => (dispatch) => {
  cookies.remove("__MT__",{ path: '/' });
  dispatch(slice.adminLogout())
}
