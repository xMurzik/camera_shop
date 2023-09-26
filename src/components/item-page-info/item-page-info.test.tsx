import { describe } from 'vitest';
import { withStore } from '../../mocks/mock-components';
import ItemPageInfo from './item-page-info';
import { createComments, createItems } from '../../mocks/mock';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

describe('item page info', () => {
  const items = createItems();
  const comments = createComments();

  it('loading state is true', () => {
    const { withStoreComponent } = withStore(<ItemPageInfo />, {
      item: {
        item: items[0],
        similarItems: [...items],
        comments: [...comments],
      },
    });
    const withBrowserRouter = (
      <BrowserRouter>{withStoreComponent}</BrowserRouter>
    );

    render(withBrowserRouter);

    expect(screen.queryByAltText(items[0].name)).not.toBeInTheDocument();
  });
});
