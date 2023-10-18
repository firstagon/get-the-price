import { configureStore } from "@reduxjs/toolkit";


import userState from "./state-slice";
import uiSlice from './ui-actions';

const store = configureStore({
  reducer: { userState: userState, ui:  uiSlice.reducer},
});

export default store;