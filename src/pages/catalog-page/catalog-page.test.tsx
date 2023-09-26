import { render, screen } from '@testing-library/react';
import { describe } from 'vitest';
import CatalogPage from './catalog-page';
import { withStore } from '../../mocks/mock-components';
import { createFakeStore } from '../../mocks/mock';
import { BrowserRouter } from 'react-router-dom';

describe('catalog page', () => {
  const fakeStore = createFakeStore();
  it('shoud render correctly', () => {
    const { withStoreComponent } = withStore(<CatalogPage />, fakeStore);
    const withRouter = <BrowserRouter>{withStoreComponent}</BrowserRouter>;

    const { container } = render(withRouter);

    expect(
      screen.getAllByText(
        'Профессиональная камера от известного производителя'
      )[0]
    ).toBeInTheDocument();
    expect(container.querySelector('.page-content')).toBeInTheDocument();
  });
});
