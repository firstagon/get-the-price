import { createSlice } from "@reduxjs/toolkit";
import stateSlice from "./state-slice";

const itemsSlice = createSlice({
    name: "user-state",
    initialState: {
        
    },
    reducers: {
        setItems(state, action) {

        },
        setItem(state, action) {

        }
    }
});


export const itemsActions = stateSlice;

export default stateSlice.reducers;