import { createSlice } from "@reduxjs/toolkit";

const stateSlice = createSlice({
    name: "user-state",
    initialState: {
        isAuth: false,
        token: null,
        userId: null,
        authLoading: false,
        name: null,
        location: null
    },
    reducers: {
        logOut(state, action) {
            return { ...state, ...action.payload };
        },
        logIn(state, action) {
            return { ...state, ...action.payload };
        },
        init(state, action) {
            return { ...state, ...action.payload };
        },

    },
});

export const stateActions = stateSlice.actions;

export default stateSlice.reducer;
