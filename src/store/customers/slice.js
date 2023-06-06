import { createSlice } from "@reduxjs/toolkit"

export const customerSlice = createSlice({
    name: "customers",
    initialState: {
        customersList: [],
        isLoading: true

    },
    reducers: {
        setCustomers: (state, action) => {
            return {
                ...state,
                customersList: action.payload,
                isLoading: false
            }
        },

    }
})
