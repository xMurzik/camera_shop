import { createSlice } from '@reduxjs/toolkit';
import { IItem } from '../../types/items';
import { fetchItems } from './async-items';

interface IItemsSlice {
  items: Array<IItem>;
  isLoading: boolean;
  isError: boolean;
}

const initialState: IItemsSlice = {
  items: [],
  isLoading: true,
  isError: false,
};

const itemsSlice = createSlice({
  name: '@items',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state) => {
        state.isError = true;
      });
  },
});

export default itemsSlice.reducer;
