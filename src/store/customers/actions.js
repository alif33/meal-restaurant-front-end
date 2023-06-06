import { getData } from '../../__lib__/helpers/HttpService';
import { customerSlice } from "./slice";
const { actions: slice } = customerSlice;

export const setCustomers = () => (dispatch) => {
  getData('/admin/customers')
    .then(response => dispatch(slice.setCustomers(response)))
}
