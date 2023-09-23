import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IItem } from '../../types/items';

interface ICatalogModalSlice {
  currentActiveCatalogItem: IItem | null;
  currentActiveBasketItem: IItem | null;
}

const initialState: ICatalogModalSlice = {
  currentActiveCatalogItem: null,
  currentActiveBasketItem: null,
};

const catalogModalSlice = createSlice({
  name: '@catalog',
  initialState,
  reducers: {
    setCurrentActiveCatalogItem: (state, action: PayloadAction<IItem>) => {
      state.currentActiveCatalogItem = { ...action.payload };
    },
    setCurrentActiveBasketItem: (state, action: PayloadAction<IItem>) => {
      state.currentActiveBasketItem = { ...action.payload };
    },
  },
});

export const { setCurrentActiveBasketItem, setCurrentActiveCatalogItem } =
  catalogModalSlice.actions;

export default catalogModalSlice.reducer;
