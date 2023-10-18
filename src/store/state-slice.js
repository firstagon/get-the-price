import { createSlice } from "@reduxjs/toolkit";

const stateSlice = createSlice({
    name: "user-state",
    initialState: {
        showBackdrop: false,
        showMobileNav: false,
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
            state = { ...state, ...action.payload };
        },
        logIn(state, action) {
            state = { ...state, ...action.payload };
        },
        error(state, action) {
            state = { ...state, ...action.payload };
        },
        setCurrentStory(state, action) {
            // console.log(action.payload.item)
            state.currentStory = action.payload.item;
        },
        setIdComment(state, action) {
            console.log(action.payload.items)
            state.comments = action.payload.items;
        },
        setCurrentComments(state, action) {
            state.currentComments = action.payload.items
        }
    },
});


export const newsActions = stateSlice.actions;

export default stateSlice.reducer;
