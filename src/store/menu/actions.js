import { getData } from "../../__lib__/helpers/HttpService";
import { menuSlice } from "./slice";
const { actions: slice } = menuSlice;

export const setCategories = restaurant => (dispatch) => {
  getData(`/menu/categories?resturant=${restaurant}`)
  .then(res=>{
    if(res)
      {
        dispatch(slice.setCategories(res));
      }
  })
  .catch(err=>{
    console.log(err);
  })
};
