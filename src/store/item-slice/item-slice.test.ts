import { createComments, createItems } from '../../mocks/mock';
import { fetchItem } from './async-item';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import itemSlice from './item-slice';
import { ApiRoute, MAIN_API_URL } from '../../constants/api';

describe('item slice', () => {
  const items = createItems();
  const oneItem = createItems()[0];
  const comments = createComments();
  const mockAxios = new MockAdapter(axios);

  const state = { item: null, similarItems: [], comments: [] };

  it('fetch item fullfield', () => {
    const expectedState = {
      similarItems: [...items],
      item: { ...oneItem },
      comments: [...comments],
    };

    const result = itemSlice(
      state,
      fetchItem.fulfilled(
        {
          currentData: { ...oneItem },
          similarItems: [...items],
          comments: [...comments],
        },
        '',
        5
      )
    );

    expect(result).toEqual(expectedState);
  });

  it('fetch item reject', () => {
    const toTest = {
      similarItems: [...items],
      item: { ...oneItem },
      comments: [...comments],
    };

    const result = itemSlice(toTest, fetchItem.rejected);

    expect(result).toEqual(state);
  });

  it('fetchItem async', () => {
    mockAxios
      .onGet(`${MAIN_API_URL + ApiRoute.GetAllItems}/${oneItem.id}`)
      .reply(200, items);

    mockAxios
      .onGet(
        `${MAIN_API_URL + ApiRoute.GetAllItems}/${oneItem.id}/${
          ApiRoute.Similar
        }`
      )
      .reply(200, items);

    mockAxios
      .onGet(
        `${MAIN_API_URL + ApiRoute.GetAllItems}/${oneItem.id}/${
          ApiRoute.Reviews
        }`
      )
      .reply(200, comments);

    const sortedComments = [...comments].sort(
      (a, b) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime()
    );

    expect(sortedComments).not.toEqual(comments);
  });
});
