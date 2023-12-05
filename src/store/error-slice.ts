import { createSlice } from "@reduxjs/toolkit";

type TErrorSlice = {
  status: string | null;
  errorShown: boolean;
  error: {
    name: string | null;
    message: string | null;
  } | null;
};

const initialState: TErrorSlice = {
  status: null,
  errorShown: false,
  error: null,
};

const stateSlice = createSlice({
  name: "error-state",
  initialState,
  reducers: {
    error(state, action) {
      return { ...state, ...action.payload };
    },
  },
});

export const errorActions = stateSlice.actions;

export default stateSlice.reducer;
