import { authSlice } from "./slice";
const { actions: slice } = authSlice;

export const LogedIn = ({user, token}) => (dispatch) => {
    dispatch(slice.LogedIn({user, token}))
}
  
export const LogedOut = () => (dispatch) => {
    dispatch(slice.LogedOut())
}