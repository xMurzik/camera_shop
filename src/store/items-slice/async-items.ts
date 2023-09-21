import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IItem } from '../../types/items';
import { AppDispatch, State } from '../store';
import { ApiRoute, MAIN_API_URL } from '../../constants/api';
import { MAX_ELEMS_ON_ONE_PAGE } from '../../constants/common';
import { setFiltredItems } from './items-slice';

export const fetchItems = createAsyncThunk<
  Array<IItem>,
  undefined,
  { dispatch: AppDispatch; state: State }
>('items/fetchItems', async (_, { dispatch, getState }) => {
  const { data } = await axios.get<Array<IItem>>(
    `${MAIN_API_URL}${ApiRoute.getAllItems}`
  );

  if (!getState().items.filtredItems.length) {
    const params = new URLSearchParams(window.location.search);
    const pageParam = params.get('page');

    if (!pageParam) {
      const filtredItems = data.slice(0, MAX_ELEMS_ON_ONE_PAGE);
      dispatch(setFiltredItems(filtredItems));
    } else {
      let filtredItems: Array<IItem> = [];
      const maxPages = Math.ceil(data.length / MAX_ELEMS_ON_ONE_PAGE);
      if (
        Number(pageParam) > maxPages ||
        Number(pageParam) < 0 ||
        !Number(pageParam)
      ) {
        filtredItems = data.slice(0, MAX_ELEMS_ON_ONE_PAGE);
      } else {
        const indexMaxItems = Number(pageParam) * MAX_ELEMS_ON_ONE_PAGE;
        const indexStartItems = indexMaxItems - MAX_ELEMS_ON_ONE_PAGE;
        filtredItems = data.slice(indexStartItems, indexMaxItems);
      }
      dispatch(setFiltredItems(filtredItems));
    }
  }

  return data;
});
