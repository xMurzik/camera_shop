import { createItems, extractActionsTypes } from '../../mocks/mock';
import { fetchItems } from './async-items';
import MockAdapter from 'axios-mock-adapter';
import itemsSlice, { onClickPagination, setFiltredItems } from './items-slice';
import axios from 'axios';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { ApiRoute, MAIN_API_URL } from '../../constants/api';
import { State } from '../store';
import { AppThunkDispatch } from '../../mocks/mock-components';
import { IItem } from '../../types/items';

describe('items slice', () => {
  const items = createItems(50);
  const filtredItems = createItems();
  const mockAxios = new MockAdapter(axios);

  const state = {
    items: [],
    filtredItems: [],
    isLoading: true,
    isError: false,
  };

  const middleware = [thunk];

  const mockStoreCreator = configureMockStore<
    State,
    Action<string>,
    AppThunkDispatch
  >(middleware);

  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      items: {
        items: [...items],
        filtredItems: [],
        isLoading: true,
        isError: false,
      },
    });
  });

  it('fetchItems and param page not good', () => {
    mockAxios.onGet(`${MAIN_API_URL}${ApiRoute.GetAllItems}`).reply(200, items);

    const toStateFiltredItems: Array<IItem> = items.slice(0, 9);

    store.dispatch(setFiltredItems(toStateFiltredItems));

    const actions = extractActionsTypes(store.getActions());

    expect(actions).toEqual([setFiltredItems.type]);
  });

  it('fetchItems and param page is good', () => {
    const pageParam = 5;
    mockAxios.onGet(`${MAIN_API_URL}${ApiRoute.GetAllItems}`).reply(200, items);
    const indexMaxItems = Number(pageParam) * 9;
    const indexStartItems = indexMaxItems - 9;
    const filtredItemsPagg = [...items].slice(indexStartItems, indexMaxItems);
    const expectedRes = [...items].slice(36, 45);

    expect(expectedRes).toEqual(filtredItemsPagg);
  });

  it('setFiltredItems', () => {
    const expectedState = { ...state, filtredItems: [...filtredItems] };

    const result = itemsSlice(state, setFiltredItems(filtredItems));

    expect(result).toEqual(expectedState);
  });

  it('onClickPag payload 0', () => {
    const expectedState = {
      ...state,
      items: [...items],
      filtredItems: [...items].slice(0, 9),
    };

    const result = itemsSlice(
      { ...state, items: [...items] },
      onClickPagination(0)
    );

    expect(result).toEqual(expectedState);
  });

  it('onClickPag  3', () => {
    const indexEnd = 9 * 3;
    const indexStart = indexEnd - 9;

    const expectedState = {
      ...state,
      items: [...items],
      filtredItems: [...items].slice(indexStart, indexEnd),
    };

    const result = itemsSlice(
      { ...state, items: [...items] },
      onClickPagination(3)
    );

    expect(result).toEqual(expectedState);
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
