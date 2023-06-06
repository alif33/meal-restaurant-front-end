import { createSlice } from "@reduxjs/toolkit"

export const SettingSlice = createSlice({
    name: "settings",
    initialState: {
        sidebar: false,
        modal: false,
        login: false
    },
    reducers: {
        sidebarToggle: (state, action) => {
            return {
                ...state,
                sidebar: !action.payload,
            }
        },
        modalToggle: (state, action) => {
            return {
                ...state,
                modal: !action.payload,
                login: false,
            }
        },
        switchToLogin: (state, action) => {
            return {
                ...state,
                modal: true,
                login: true,

            }
        },

    }
})
