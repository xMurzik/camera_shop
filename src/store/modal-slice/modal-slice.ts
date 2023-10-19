import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IItem } from '../../types/items';

interface ICatalogModalSlice {
  currentActiveCatalogItem: IItem | null;
  currentActiveBasketItem: IItem | null;
  currentActiveDeleteItem: IItem | null;
  isShowModalToBuy: boolean;
  isShowModalSuccesBasket: boolean;
  isShowModalToDelete: boolean;
  isShowThanksForBuy: boolean;
}

const initialState: ICatalogModalSlice = {
  currentActiveCatalogItem: null,
  currentActiveBasketItem: null,
  currentActiveDeleteItem: null,
  isShowModalToBuy: false,
  isShowModalSuccesBasket: false,
  isShowModalToDelete: false,
  isShowThanksForBuy: false,
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
    },
    onClickOverlayOrExit: (state) => {
      state.isShowModalSuccesBasket = false;
      state.isShowModalToBuy = false;
      state.isShowModalToDelete = false;
      state.isShowThanksForBuy = false;
    },
    onClickSuccessBuy: (state) => {
      state.isShowModalToBuy = false;
      state.isShowModalSuccesBasket = true;
    },
    onClickDeleteButton: (state, action: PayloadAction<IItem>) => {
      state.isShowModalToDelete = true;
      state.currentActiveDeleteItem = { ...action.payload };
    },
    onClickMakeOrder: (state) => {
      state.isShowThanksForBuy = true;
    },
  },
});

export const {
  setCurrentActiveBasketItem,
  setCurrentActiveCatalogItem,
  onClickBuy,
  onClickOverlayOrExit,
  onClickSuccessBuy,
  onClickDeleteButton,
  onClickMakeOrder,
} = modalSlice.actions;

export default modalSlice.reducer;
