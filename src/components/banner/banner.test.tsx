import { render, screen } from '@testing-library/react';
import { withStore } from '../../mocks/mock-components';
import Banner from './banner';
import { createPromos } from '../../mocks/mock';
import { BrowserRouter } from 'react-router-dom';

describe('Banner', () => {
  const promos = createPromos();
  it('renders Swiper component with slides', () => {
    const { withStoreComponent } = withStore(<Banner />, {
      promo: { promos: [...promos], isLoading: false, isError: false },
    });
    const withBrowserRouterComp = (
      <BrowserRouter>{withStoreComponent}</BrowserRouter>
    );

    render(withBrowserRouterComp);

    expect(screen.getByText(promos[0].name)).toBeInTheDocument();
    expect(screen.getByText(promos[1].name)).toBeInTheDocument();
  });
});
