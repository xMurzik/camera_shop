import { createItems } from '../../mocks/mock';
import { fetchItems } from './async-items';
import MockAdapter from 'axios-mock-adapter';
import itemsSlice from './items-slice';
import axios from 'axios';
import { ApiRoute, MAIN_API_URL } from '../../constants/api';

describe('items slice', () => {
  const items = createItems(50);

  const mockAxios = new MockAdapter(axios);

  const state = {
    items: [],
    isLoading: true,
    isError: false,
  };

  it('fetchItems and param page is good', () => {
    const pageParam = 5;
    mockAxios.onGet(`${MAIN_API_URL}${ApiRoute.GetAllItems}`).reply(200, items);
    const indexMaxItems = Number(pageParam) * 9;
    const indexStartItems = indexMaxItems - 9;
    const filtredItemsPagg = [...items].slice(indexStartItems, indexMaxItems);
    const expectedRes = [...items].slice(36, 45);

    expect(expectedRes).toEqual(filtredItemsPagg);
  });

  it('fetchItems.pending', () => {
    const stateCopy = {
      items: [],
      filtredItems: [],
      isLoading: false,
      isError: true,
    };

    const expectedState = {
      ...stateCopy,
      isLoading: true,
      isError: false,
    };

    const result = itemsSlice(stateCopy, fetchItems.pending);

    expect(result).toEqual(expectedState);
  });

  it('fetchItems.fulfilled', () => {
    const result = itemsSlice(
      state,
      fetchItems.fulfilled(items, '', undefined)
    );

    const expectedState = {
      ...state,
      items: [...items],
      isLoading: false,
    };

    expect(result).toEqual(expectedState);
  });

  it('fetchItems.reject', () => {
    const stateCopy = {
      items: [],
      filtredItems: [],
      isLoading: true,
      isError: false,
    };

    const expectedState = {
      ...stateCopy,
      isLoading: false,
      isError: true,
    };

    const result = itemsSlice(stateCopy, fetchItems.rejected);

    expect(result).toEqual(expectedState);
  });
});
