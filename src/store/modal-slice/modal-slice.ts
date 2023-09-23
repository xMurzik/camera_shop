import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IItem } from '../../types/items';

interface ICatalogModalSlice {
  currentActiveCatalogItem: IItem | null;
  currentActiveBasketItem: IItem | null;
  isShowModalToBuy: boolean;
  isShowModalSuccesBasket: boolean;
}

const initialState: ICatalogModalSlice = {
  currentActiveCatalogItem: null,
  currentActiveBasketItem: null,
  isShowModalToBuy: false,
  isShowModalSuccesBasket: false,
};

const modalSlice = createSlice({
  name: '@modal',
  initialState,
  reducers: {
    setCurrentActiveCatalogItem: (state, action: PayloadAction<IItem>) => {
      state.currentActiveCatalogItem = { ...action.payload };
    },
    setCurrentActiveBasketItem: (state, action: PayloadAction<IItem>) => {
      state.currentActiveBasketItem = { ...action.payload };
    },
    onClickBuy: (state, action: PayloadAction<IItem>) => {
      state.isShowModalToBuy = true;
      state.currentActiveCatalogItem = { ...action.payload };
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        document.getElementById('add-item-to-basket')?.focus();
      }, 300);
    },
    onClickOverlayOrExit: (state) => {
      state.isShowModalSuccesBasket = false;
      state.isShowModalToBuy = false;
      document.body.style.overflow = 'unset';
    },
    onClickSuccessBuy: (state) => {
      state.isShowModalToBuy = false;
      state.isShowModalSuccesBasket = true;

      setTimeout(() => {
        document.getElementById('cont-to-buy')?.focus();
      }, 300);
    },
  },
});

export const {
  setCurrentActiveBasketItem,
  setCurrentActiveCatalogItem,
  onClickBuy,
  onClickOverlayOrExit,
  onClickSuccessBuy,
} = modalSlice.actions;

export default modalSlice.reducer;
