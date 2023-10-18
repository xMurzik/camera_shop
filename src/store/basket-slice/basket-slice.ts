import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IItem } from '../../types/items';
import { IItemCard } from '../../types/basket';
import {
  setItemsToLocalBasket,
  getItemsFromBasket,
  resetBasketItems,
} from '../../utils/basket';
import { fetchCoupon } from './async-basket';
import { SALES } from '../../constants/basket';

interface IBasketSlice {
  items: Array<IItemCard>;
  sale: { value: number; name: string } | null;
  isError: boolean;
}

const initialState: IBasketSlice = {
  items: getItemsFromBasket(),
  sale: null,
  isError: false,
};

const basketSlice = createSlice({
  name: '@basket',
  initialState,
  reducers: {
    resetBasket: (state) => {
      state.isError = false;
      state.items = [];
      state.sale = null;
      resetBasketItems();
    },
    addItemsToBasket: (state, action: PayloadAction<IItem>) => {
      if (!state.items.some((el) => el.id === action.payload.id)) {
        state.items.push({ ...action.payload, count: 1 });
      } else {
        state.items = state.items.map((el) =>
          el.id === action.payload.id ? { ...el, count: el.count + 1 } : el
        );
      }

      setItemsToLocalBasket(state.items);
    },
    deleteAllItems: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((el) => el.id !== action.payload);
      setItemsToLocalBasket(state.items);
    },
    increaseCountItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.map((el) =>
        el.id === action.payload ? { ...el, count: el.count + 1 } : el
      );
      setItemsToLocalBasket(state.items);
    },
    decreaseCountItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.map((el) =>
        el.id === action.payload ? { ...el, count: el.count - 1 } : el
      );
      setItemsToLocalBasket(state.items);
    },
    setCountItem: (
      state,
      action: PayloadAction<{ id: number; count: number }>
    ) => {
      state.items = state.items.map((el) =>
        el.id === action.payload.id
          ? { ...el, count: action.payload.count }
          : el
      );
      setItemsToLocalBasket(state.items);
    },
    resetError: (state) => {
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoupon.pending, (state) => {
        state.isError = false;
      })
      .addCase(fetchCoupon.fulfilled, (state, action) => {
        let name: string;
        switch (action.payload) {
          case SALES[0][0]:
            name = SALES[0][1];
            break;
          case SALES[1][0]:
            name = SALES[1][1];
            break;
          case SALES[2][0]:
            name = SALES[2][1];
            break;
          default:
            name = '';
            break;
        }
        const result = { name, value: action.payload };

        state.sale = result;
      })
      .addCase(fetchCoupon.rejected, (state) => {
        state.isError = true;
        state.sale = null;
      });
  },
});

export const {
  addItemsToBasket,
  deleteAllItems,
  increaseCountItem,
  decreaseCountItem,
  setCountItem,
  resetError,
  resetBasket,
} = basketSlice.actions;

export default basketSlice.reducer;
