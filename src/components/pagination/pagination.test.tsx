import { describe } from 'vitest';
import { withStore } from '../../mocks/mock-components';
import Pagination from './pagination';
import { createFakeStore, createItems } from '../../mocks/mock';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

describe('pagination', () => {
  const fakeStore = createFakeStore();
  it('shoud render correctly', () => {
    fakeStore.items.items = createItems(59);
    const { withStoreComponent } = withStore(<Pagination />, fakeStore);

    const withRouter = <BrowserRouter>{withStoreComponent}</BrowserRouter>;
    const { container } = render(withRouter);

    expect(container.querySelector('.pagination')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });
});
