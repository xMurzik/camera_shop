import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IItem } from '../../types/items';
import { AppDispatch, State } from '../store';
import { ApiRoute, MAIN_API_URL } from '../../constants/api';

export const fetchItems = createAsyncThunk<
  Array<IItem>,
  undefined,
  { dispatch: AppDispatch; state: State }
>('items/fetchItems', async () => {
  const { data } = await axios.get<Array<IItem>>(
    `${MAIN_API_URL + ApiRoute.getAllItems}`
  );

  return data;
});
