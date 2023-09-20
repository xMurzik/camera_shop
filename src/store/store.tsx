import { configureStore, combineReducers } from '@reduxjs/toolkit';
import promoSlice from './promo-slice/promo-slice';
import itemsSlice from './items-slice/items-slice';

export const rootReducer = combineReducers({
  promo: promoSlice,
  items: itemsSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type State = ReturnType<typeof store.getState>;
export type Reducer = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
