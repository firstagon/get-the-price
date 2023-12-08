import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TNotice = {
  title: string | null;
  message:  string | null;
  noticeStatus:  string | null;
  isShown: boolean;
  status:  string | null;
};

const stateSlice = createSlice({
  name: "notice-slice",
  initialState: {
    title: "Hey",
    message: "I'm here",
    noticeStatus: null,
    isShown: false,
    status: null,
  } as TNotice,
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
