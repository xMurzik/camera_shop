import { State } from '../store';

export const getDataItem = (state: State) => state.item.item;
export const getSimilarItems = (state: State) => state.item.similarItems;
