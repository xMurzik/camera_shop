import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../store';
import { ApiRoute, MAIN_API_URL } from '../../constants/api';
import { IItemCard } from '../../types/basket';

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

export const makeOrder = createAsyncThunk<
  void,
  Array<IItemCard>,
  { dispatch: AppDispatch; state: State }
>('makeOrder', async (values, { getState }) => {
  const ids: Array<number> = [];
  const sale = getState().basket.sale;

  values.forEach((el) => {
    for (let i = 0; i < el.count; i++) {
      ids.push(el.id);
    }
  });

  const body = { camerasIds: ids, coupon: sale ? sale.name : null };

  await axios.post<number>(`${MAIN_API_URL}${ApiRoute.Orders}`, body);
});
