import { CreateSliceOptions, Slice, createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

export type TItem = {
  itemCode: number;
  itemName: string;
  lastPrice: number;
  updated: string;
  favorite: boolean | undefined;
  data: {
    date: string;
    itemPrice: {
      price: number;
      updated: string;
    };
    priceCurrency: string;
    itemCode: number;
    itemName: string;
    brand?: string;
    desc?: string;
    imageUrl: string;
    itemUrl: string;
    itemRating: number;
  };
};

type TItems = {
  items: TItem[] | null;
  item: TItem | null;
};

const initialState = {
  items: null,
  item: null,
} as TItems;

const itemsSlice: Slice = createSlice({
  name: "user-state",
  initialState,
  reducers: {
    setItems(state, action) {
      return { ...state, items: action.payload };
    },
    setfavorite(state: TItems, action: PayloadAction<TItem>) {
      const itemCode = action.payload.itemCode;
      const item = state.items?.find((el: TItem) => el.itemCode === itemCode) as TItem;
      item.favorite = !item.favorite;
    },
    setItem(state, action) {
      return { ...state, item: action.payload };
    },
    clearItem(state) {
      return { ...state.items, item: null };
    },
    clearAll() {
      return { items: null, item: null };
    },
  },
});

export const itemsActions = itemsSlice.actions;

export default itemsSlice.reducer;
