import { getData } from '../../__lib__/helpers/HttpService';
import { singleMemberSlice } from "./slice";
const { actions: slice } = singleMemberSlice;

export const setSingleMember = (id) => (dispatch) => {
  
  getData(`/admin/member/${id}`)
    .then(response => dispatch(slice.setSingleMember(response)))
}
