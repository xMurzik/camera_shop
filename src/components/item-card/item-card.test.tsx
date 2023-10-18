import { BrowserRouter } from 'react-router-dom';
import { createFakeStore, createItems } from '../../mocks/mock';
import { withStore } from '../../mocks/mock-components';
import ItemCard from './item-card';
import { render, screen } from '@testing-library/react';

describe('item card', () => {
  const items = createItems();

  it('shoud render correctly', () => {
    const fakeStore = createFakeStore();

    const { withStoreComponent } = withStore(
      <ItemCard {...items[0]} />,
      fakeStore
    );

    const withBrowserRouter = (
      <BrowserRouter>{withStoreComponent}</BrowserRouter>
    );

    render(withBrowserRouter);

    screen.debug();

    expect(screen.getByText(items[0].name)).toBeInTheDocument();
  });
});
