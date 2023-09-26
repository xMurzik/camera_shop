import { render } from '@testing-library/react';
import { describe } from 'vitest';
import ItemPage from './item-page';
import { withStore } from '../../mocks/mock-components';
import { createFakeStore } from '../../mocks/mock';
import { BrowserRouter } from 'react-router-dom';

describe('item page', () => {
  const fakeStore = createFakeStore();
  it('shoud render correctly', () => {
    const { withStoreComponent } = withStore(<ItemPage />, fakeStore);
    const withRouter = <BrowserRouter>{withStoreComponent}</BrowserRouter>;

    const { container } = render(withRouter);

    expect(container.querySelector('.product-similar')).toBeInTheDocument();
    expect(container.querySelector('.review-block')).toBeInTheDocument();
  });
});
