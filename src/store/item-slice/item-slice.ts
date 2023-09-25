import { createSlice } from '@reduxjs/toolkit';
import { IItem } from '../../types/items';
import { IComment } from '../../types/comments';
import { fetchItem, fetchPostComment } from './async-item';
import { toast } from 'react-toastify';

interface IItemSlice {
  item: IItem | null;
  similarItems: Array<IItem>;
  comments: Array<IComment>;
}

const initialState: IItemSlice = {
  item: null,
  similarItems: [],
  comments: [],
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
        state.comments = action.payload.comments;
      })
      .addCase(fetchItem.rejected, (state) => {
        state.item = null;
        state.similarItems = [];
        state.comments = [];
      })
      .addCase(fetchPostComment.rejected, () => {
        toast.warn('Ошибка отправки, попробуйте позже');
      });
  },
});

export default itemSlice.reducer;
