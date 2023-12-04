import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const stateSlice = createSlice({
  name: "notice-slice",
  initialState: {
    title: "Hey",
    message: "I'm here",
    noticeStatus: null,
    isShown: null,
  },
  reducers: {
    show<T, K extends PayloadAction<T>>(state: T, action: K): T {
      return {
        ...action.payload,
        isShown: true,
      };
    },
    hide<T>(state: T) {
      return {
        ...state,
        isShown: false,
      };
    },
  },
});

export const noticeActions = stateSlice.actions;
export default stateSlice.reducer;
