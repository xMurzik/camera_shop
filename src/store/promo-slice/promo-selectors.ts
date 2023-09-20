import { State } from '../store';

export const getPromoStatusError = (state: State) => state.promo.isError;
export const getPromoStatusLoading = (state: State) => state.promo.isLoading;
export const getPromos = (state: State) => state.promo.promos;
