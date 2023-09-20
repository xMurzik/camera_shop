import { createSlice } from '@reduxjs/toolkit';
import { IPromo } from '../../types/promo';
import { fetchPromos } from './async-promo';

interface IPromoSlice {
  promos: Array<IPromo>;
  isLoading: boolean;
  isError: boolean;
}

const initialState: IPromoSlice = {
  promos: [],
  isLoading: true,
  isError: false,
};

const promoSlice = createSlice({
  name: '@promos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPromos.pending, (state) => {
        state.isLoading = true;
        state.isError = true;
      })
      .addCase(fetchPromos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.promos = action.payload;
      })
      .addCase(fetchPromos.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});

export default promoSlice.reducer;
