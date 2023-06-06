import { createSlice } from "@reduxjs/toolkit"

export const singleMemberSlice = createSlice({
    name: "singleMember",
    initialState: {
        member: null,
        isLoading: true

    },
    reducers: {
        setSingleMember: (state, action) => {
            return {
                ...state,
                member: action.payload,
                isLoading: false
            }
        },

    }
})
