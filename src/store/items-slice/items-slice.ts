import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IItem } from '../../types/items';
import { fetchItems } from './async-items';
import { MAX_ELEMS_ON_ONE_PAGE } from '../../constants/common';

interface IItemsSlice {
  items: Array<IItem>;
  filtredItems: Array<IItem>;
  isLoading: boolean;
  isError: boolean;
}

const initialState: IItemsSlice = {
  items: [],
  filtredItems: [],
  isLoading: true,
  isError: false,
};

const itemsSlice = createSlice({
  name: '@items',
  initialState,
  reducers: {
    setFiltredItems: (state, action: PayloadAction<Array<IItem>>) => {
      state.filtredItems = action.payload;
    },
    onClickPagination: (state, action: PayloadAction<number>) => {
      if (action.payload === 0) {
        state.filtredItems = state.items.slice(0, MAX_ELEMS_ON_ONE_PAGE);
        return;
      }

      const indexMaxItems = action.payload * MAX_ELEMS_ON_ONE_PAGE;
      const indexStartItems = indexMaxItems - MAX_ELEMS_ON_ONE_PAGE;
      state.filtredItems = state.items.slice(indexStartItems, indexMaxItems);
    },
  },
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

export const { setFiltredItems, onClickPagination } = itemsSlice.actions;

export default itemsSlice.reducer;
