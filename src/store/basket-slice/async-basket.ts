import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../store';
import { ApiRoute, MAIN_API_URL } from '../../constants/api';

export const fetchCoupon = createAsyncThunk<
  number,
  string,
  { dispatch: AppDispatch; state: State }
>('fetchCoupon', async (value) => {
  const { data } = await axios.post<number>(
    `${MAIN_API_URL}${ApiRoute.Сoupons}`,
    {
      coupon: value,
    }
  );

  return data;
});
