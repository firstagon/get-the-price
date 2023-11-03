import { configureStore } from "@reduxjs/toolkit";


import userState from "./state-slice";
import errorState from "./error-slice";
import noticeState from './notice-slice';
import itemsState from './items-slice';
// import uiSlice from './ui-actions';

const store = configureStore({
  reducer: { userState, errorState, noticeState, itemsState},
});

export default store;