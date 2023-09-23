import { configureStore, combineReducers } from '@reduxjs/toolkit';
import promoSlice from './promo-slice/promo-slice';
import itemsSlice from './items-slice/items-slice';
import itemSlice from './item-slice/item-slice';
import catalogModalSlice from './catalog-modal-slice/catalog-modal-slice';

export const rootReducer = combineReducers({
  promo: promoSlice,
  items: itemsSlice,
  item: itemSlice,
  modal: catalogModalSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type State = ReturnType<typeof store.getState>;
export type Reducer = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
