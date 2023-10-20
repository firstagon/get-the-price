import { createSlice } from "@reduxjs/toolkit";

const stateSlice = createSlice({
    name: 'notice-slice',
    initialState: {
        title: 'Hey',
        message: 'I\'m here',
        noticeStatus: null,
        isShown: null
    },
    reducers: {
        show(state, action) {
            return {
                ...action.payload,
                isShown: true
            }
        },
        hide(state) {
            return {
                ...state,
                isShown: false
            }
        }
    }
})

export const noticeActions = stateSlice.actions;
export default stateSlice.reducer;