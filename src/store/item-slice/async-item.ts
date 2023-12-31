import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../store';
import { ApiRoute, MAIN_API_URL } from '../../constants/api';
import { IItem } from '../../types/items';
import { IComment } from '../../types/comments';
import { fetchItems } from '../items-slice/async-items';

interface IReturnResponse {
  currentData: IItem;
  similarItems: Array<IItem>;
  comments: Array<IComment>;
}

export const fetchItem = createAsyncThunk<
  IReturnResponse,
  number,
  { dispatch: AppDispatch; state: State }
>('item/fetchItem', async (id) => {
  const urls = [
    `${MAIN_API_URL + ApiRoute.GetAllItems}/${id}`,
    `${MAIN_API_URL + ApiRoute.GetAllItems}/${id}/${ApiRoute.Similar}`,
    `${MAIN_API_URL + ApiRoute.GetAllItems}/${id}/${ApiRoute.Reviews}`,
  ];

  const requests = urls.map((url) => axios.get(url));

  const data = await axios.all(requests);

  (data[2].data as Array<IComment>).sort(
    (a, b) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime()
  );

  const dataToReturn: IReturnResponse = {
    currentData: { ...data[0].data } as IItem,
    similarItems: data[1].data as Array<IItem>,
    comments: data[2].data as Array<IComment>,
  };

  return dataToReturn;
});

export const fetchPostComment = createAsyncThunk<
  void,
  Omit<IComment, 'id' | 'createAt'>,
  { dispatch: AppDispatch; state: State }
>('comments/fetchPostComment', async (body, { dispatch }) => {
  await axios
    .post<IComment>(`${MAIN_API_URL + ApiRoute.Reviews}`, body)
    .then(() => {
      dispatch(fetchItems());
    });
  await dispatch(fetchItem(body.cameraId));
});
