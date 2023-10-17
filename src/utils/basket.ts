import { BASKET_KEY_STORAGE } from '../constants/basket';
import { IItemCard } from '../types/basket';

export const getItemsFromBasket = () => {
  const items = localStorage.getItem(BASKET_KEY_STORAGE);

  if (!items) {
    return [];
  }

  return JSON.parse(items) as Array<IItemCard>;
};

export const setItemsToLocalBasket = (item: Array<IItemCard>) =>
  localStorage.setItem(BASKET_KEY_STORAGE, JSON.stringify(item));
