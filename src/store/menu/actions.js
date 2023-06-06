import { getData } from "../../__lib__/helpers/HttpService";
import { menuSlice } from "./slice";
const { actions: slice } = menuSlice;

export const setCategories = resturant => (dispatch) => {
  getData(`/menu/categories?resturant=${resturant}`)
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
