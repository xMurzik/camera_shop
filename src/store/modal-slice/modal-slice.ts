import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IItem } from '../../types/items';
import { TIMEOUT, TIMEOUT_SUCCESS } from '../../constants/common';

interface ICatalogModalSlice {
  currentActiveCatalogItem: IItem | null;
  currentActiveBasketItem: IItem | null;
  currentActiveDeleteItem: IItem | null;
  isShowModalToBuy: boolean;
  isShowModalSuccesBasket: boolean;
  isShowModalToDelete: boolean;
}

const initialState: ICatalogModalSlice = {
  currentActiveCatalogItem: null,
  currentActiveBasketItem: null,
  currentActiveDeleteItem: null,
  isShowModalToBuy: false,
  isShowModalSuccesBasket: false,
  isShowModalToDelete: false,
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
      }, TIMEOUT);
    },
    onClickOverlayOrExit: (state) => {
      state.isShowModalSuccesBasket = false;
      state.isShowModalToBuy = false;
      state.isShowModalToDelete = false;
      document.body.style.overflow = 'unset';
    },
    onClickSuccessBuy: (state) => {
      state.isShowModalToBuy = false;
      state.isShowModalSuccesBasket = true;

      setTimeout(() => {
        if (document.activeElement !== document.querySelector('#cont-to-buy')) {
          (
            document.querySelector('#cont-to-buy') as HTMLButtonElement
          )?.focus();
        }
      }, TIMEOUT_SUCCESS);
    },
    onClickDeleteButton: (state, action: PayloadAction<IItem>) => {
      state.isShowModalToDelete = true;
      state.currentActiveDeleteItem = { ...action.payload };
      document.body.style.overflow = 'hidden';

      setTimeout(() => {
        document.getElementById('delete-button-modal')?.focus();
      }, TIMEOUT);
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
} = modalSlice.actions;

export default modalSlice.reducer;
