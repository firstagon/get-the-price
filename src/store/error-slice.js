import { createSlice } from "@reduxjs/toolkit";

const stateSlice = createSlice({
    name: "error-state",
    initialState: {
        status: null,
        errorShown: false,
        error: null,
    },
    reducers: {
        error(state, action) {
            return { ...state, ...action.payload };
        },
    },
});

export const errorActions = stateSlice.actions;

export default stateSlice.reducer;