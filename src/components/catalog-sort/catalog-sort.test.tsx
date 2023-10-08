import { BrowserRouter } from 'react-router-dom';
import CatalogSort from './catalog-sort';
import { render, screen } from '@testing-library/react';

describe('catalog sort', () => {
  it('shoud render correctly', () => {
    const withRoute = (
      <BrowserRouter>
        <CatalogSort />
      </BrowserRouter>
    );

    render(withRoute);

    expect(screen.getByText('по популярности')).toBeInTheDocument();

    expect(screen.getByText('по цене')).toBeInTheDocument();
  });
});
