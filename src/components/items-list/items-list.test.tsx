import { describe } from 'vitest';
import { withStore } from '../../mocks/mock-components';
import ItemsList from './items-list';
import { createItems } from '../../mocks/mock';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

describe('items list', () => {
  const items = createItems();
  it('shoud render correctly', () => {
    const { withStoreComponent } = withStore(<ItemsList />, {
      items: {
        items: [...items],
        isError: false,
        isLoading: false,
      },
    });

    const withBrowserRouter = (
      <BrowserRouter>{withStoreComponent}</BrowserRouter>
    );

    render(withBrowserRouter);

    screen.debug();

    expect(
      screen.getByText('по вашему запросу ничего не найдено')
    ).toBeInTheDocument();
  });
});
