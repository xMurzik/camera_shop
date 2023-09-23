import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IItem } from '../../types/items';

interface IBasketSlice {
  basketOfItems: Array<IItem>;
}

const initialState: IBasketSlice = {
  basketOfItems: [],
};

const basketSlice = createSlice({
  name: '@basket',
  initialState,
  reducers: {
    setNewItemToBasket: (state, action: PayloadAction<IItem>) => {
      state.basketOfItems.push(action.payload);
    },
    removeItemFromBasket: (state, action: PayloadAction<number>) => {
      state.basketOfItems = state.basketOfItems.filter(
        (el) => el.id !== action.payload
      );
    },
  },
});

export const { setNewItemToBasket, removeItemFromBasket } = basketSlice.actions;

export default basketSlice.reducer;
