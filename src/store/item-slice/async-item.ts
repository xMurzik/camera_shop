import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../store';
import { ApiRoute, MAIN_API_URL } from '../../constants/api';
import { IItem } from '../../types/items';

interface IReturnResponse {
  currentData: IItem;
  similarItems: Array<IItem>;
}

export const fetchItem = createAsyncThunk<
  IReturnResponse,
  number,
  { dispatch: AppDispatch; state: State }
>('item/fetchItem', async (id) => {
  const urls = [
    `${MAIN_API_URL + ApiRoute.getAllItems}/${id}`,
    `${MAIN_API_URL + ApiRoute.getAllItems}/${id}/${ApiRoute.similar}`,
  ];

  const requests = urls.map((url) => axios.get(url));

  const data = await axios.all(requests);

  const dataToReturn: IReturnResponse = {
    currentData: { ...data[0].data } as IItem,
    similarItems: data[1].data as Array<IItem>,
  };

  return dataToReturn;
});
