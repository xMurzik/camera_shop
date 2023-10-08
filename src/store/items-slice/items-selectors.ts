import { State } from '../store';

export const getAllItems = (state: State) => state.items.items;
export const getErrorStatusItems = (state: State) => state.items.isError;
export const getLoadingStatusItems = (state: State) => state.items.isLoading;
