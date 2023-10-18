import { createSlice } from "@reduxjs/toolkit";

const stateSlice = createSlice({
    name: "user-state",
    initialState: {
        isAuth: false,
        token: null,
        userId: null,
        authLoading: false,
        error: null,
        errorShown: false,
        name: null,
        status: null,
        location: null
    },
    reducers: {
        logOut(state, action) {
            return { ...state, ...action.payload };
        },
        logIn(state, action) {
            console.log(action)
            return { ...state, ...action.payload };
        },
        init(state, action) {
            console.log(action)
            return { ...state, ...action.payload };
        },
        error(state, action) {
            return { ...state, ...action.payload };
        },
    },
});

export const stateActions = stateSlice.actions;

export default stateSlice.reducer;
