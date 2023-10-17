import { State } from '../store';

export const getItemsFromBasket = (state: State) => state.basket.items;

export const getSale = (state: State) => state.basket.sale;

export const isErrorSale = (state: State) => state.basket.isError;
