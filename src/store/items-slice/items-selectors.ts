import { State } from '../store';

export const getAllItems = (state: State) => state.items.items;
export const getStatusLoadingItems = (state: State) => state.items.isLoading;
