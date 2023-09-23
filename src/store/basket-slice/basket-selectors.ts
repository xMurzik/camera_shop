import { State } from '../store';

export const getItemsFromBasket = (state: State) => state.basket.basketOfItems;
