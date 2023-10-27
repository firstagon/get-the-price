import { createSlice } from "@reduxjs/toolkit";

const itemsSlice = createSlice({
    name: "user-state",
    initialState: {
        items: null,
        item: null,
    },
    reducers: {
        setItems(state, action) {
            return { ...state, items: action.payload }
        },
        setfavorite(state, action) {
            const itemCode = action.payload.itemCode;
            const item = state.items.find(el => el.itemCode === itemCode);
            item.favorite = !item.favorite;
        },
        setItem(state, action) {
            return { ...state, item: action.payload }
        },
        clearItem(state) {
            return { ...state.items, item: null }
        },
        clearAll(state) {
            return { items: null, item: null }
        }
    }
});

export const itemsActions = itemsSlice.actions;

export default itemsSlice.reducer;