import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IPromo } from '../../types/promo';
import { AppDispatch, State } from '../store';
import { ApiRoute, MAIN_API_URL } from '../../constants/api';

export const fetchPromos = createAsyncThunk<
  Array<IPromo>,
  undefined,
  { dispatch: AppDispatch; state: State }
>('promo/fetchPromos', async () => {
  const { data } = await axios.get<Array<IPromo>>(
    `${MAIN_API_URL + ApiRoute.Promo}`
  );

  return data;
});
