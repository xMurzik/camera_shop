import { createSlice } from '@reduxjs/toolkit';
import { IItem } from '../../types/items';
import { fetchItem } from './async-item';

interface IItemSlice {
  item: IItem | null;
  similarItems: Array<IItem>;
}

const initialState: IItemSlice = {
  item: null,
  similarItems: [],
};

const itemSlice = createSlice({
  name: '@item',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItem.fulfilled, (state, action) => {
        state.item = action.payload.currentData;
        state.similarItems = action.payload.similarItems;
      })
      .addCase(fetchItem.rejected, (state) => {
        state.item = null;
        state.similarItems = [];
      });
  },
});

export default itemSlice.reducer;
