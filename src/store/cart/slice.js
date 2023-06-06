import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartList: [],
    },
    reducers: {

        setCart: (state, action) => {
            state.cartList.push(action.payload);
        },

        increaseCart: (state, action) => {
            ++state.cartList[action.payload].qty;
            state.cartList[action.payload].subTotal =   parseFloat( state.cartList[action.payload].data.price) * state.cartList[action.payload].qty;

        },

        decreaseCart: (state, action) => {
            --state.cartList[action.payload].qty;
            state.cartList[action.payload].subTotal = parseFloat( state.cartList[action.payload].data.price) * state.cartList[action.payload].qty;

        },
        removeCart: (state, action) => {
            state.cartList = action.payload
           
        },
    }
})