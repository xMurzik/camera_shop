import { State } from '../store';

export const getCurrentActiveCatalogItem = (state: State) =>
  state.modal.currentActiveCatalogItem;

export const getIsShowModalToBuy = (state: State) =>
  state.modal.isShowModalToBuy;

export const getIsShowModalSuccesBasket = (state: State) =>
  state.modal.isShowModalSuccesBasket;

export const getIsShowModalToDelete = (state: State) =>
  state.modal.isShowModalToDelete;

export const getCurrentActiveDeleteItem = (state: State) =>
  state.modal.currentActiveDeleteItem;

export const getIsShowThankForBuy = (state: State) =>
  state.modal.isShowThanksForBuy;
