import { BrowserRouter } from 'react-router-dom';
import { createItems } from '../../mocks/mock';
import { withStore } from '../../mocks/mock-components';
import ItemCard from './item-card';
import { render, screen } from '@testing-library/react';

describe('item card', () => {
  const items = createItems();

  it('shoud render correctly', () => {
    const { withStoreComponent } = withStore(<ItemCard {...items[0]} />);

    const withBrowserRouter = (
      <BrowserRouter>{withStoreComponent}</BrowserRouter>
    );

    render(withBrowserRouter);

    expect(screen.getByText(items[0].name)).toBeInTheDocument();
  });
});
