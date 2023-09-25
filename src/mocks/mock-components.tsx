import { State } from '../store/store';
import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';

export type AppThunkDispatch = ThunkDispatch<State, undefined, Action>;

interface IComponentWithMockStore {
  withStoreComponent: JSX.Element;
  mockStore: MockStore;
}

export function withStore(
  component: React.ReactNode,
  initialState: Partial<State> = {}
): IComponentWithMockStore {
  const mockStoreCreator = configureMockStore<
    State,
    Action<string>,
    AppThunkDispatch
  >();
  const mockStore = mockStoreCreator(initialState);

  return {
    withStoreComponent: <Provider store={mockStore}>{component}</Provider>,
    mockStore,
  };
}
