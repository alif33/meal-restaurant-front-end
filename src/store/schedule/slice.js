import { createSlice } from "@reduxjs/toolkit"

export const scheduleSlice = createSlice({
    name: "schedule",
    initialState: {
        scheduleList: [],
        specialHourList: [],
        closureList: [],
        isLoading: true

    },
    reducers: {
        setSchedule: (state = initialState, action) => {
            return {
                ...state,
                scheduleList: action.payload,
                isLoading: false
            }
        },
        setSpecialHour: (state = initialState, action) => {
            return {
                ...state,
                specialHourList: action.payload,
                isLoading: false
            }
        },
        setClosure: (state = initialState, action) => {
            return {
                ...state,
                closureList: action.payload,
                isLoading: false
            }
        },


    }
})
