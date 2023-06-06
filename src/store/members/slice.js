import { createSlice } from "@reduxjs/toolkit"

export const memberSlice = createSlice({
    name: "members",
    initialState: {
        memberList: [],
        isLoading: true

    },
    reducers: {
        setMembers: (state, action) => {
            return {
                ...state,
                memberList: action.payload,
                isLoading: false
            }
        },

    }
})
