import { cartSlice } from "./slice";
const { actions: slice } = cartSlice;

export const setCart = (_p, data, qty) => (dispatch) => {
    dispatch(slice.setCart({ _p, data, qty, subTotal:  parseFloat(data.price) }))
}
export const increaseCart = index => (dispatch) => {
    dispatch(slice.increaseCart(index))
}
export const decreaseCart = index => (dispatch) => {
    dispatch(slice.decreaseCart(index))
}
export const removeCart = newCart => (dispatch) => {
    dispatch(slice.removeCart(newCart))
}
