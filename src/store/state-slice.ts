import { createSlice } from "@reduxjs/toolkit";

export type TState = {
  isAuth: boolean;
  token: null | string;
  userId: null | string | number;
  authLoading: boolean;
  name: null | string;
  location: null | string;
};

const initialState: TState = {
  isAuth: false,
  token: null,
  userId: null,
  authLoading: false,
  name: null,
  location: null,
};

const stateSlice = createSlice({
  name: "user-state",
  initialState,
  reducers: {
    logOut(state, action) {
      return { initialState, ...action.payload };
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
