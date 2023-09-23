import { State } from '../store';

export const getCurrentActiveCatalogItem = (state: State) =>
  state.modal.currentActiveCatalogItem;

export const getCurrentActiveBasketItem = (state: State) =>
  state.modal.currentActiveBasketItem;
