import { State } from '../store';

export const getAllItems = (state: State) => state.items.items;
export const getItemsStatusLoading = (state: State) => state.items.isLoading;
export const getItemsStatusError = (state: State) => state.items.isError;
