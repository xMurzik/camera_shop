import { BrowserRouter } from 'react-router-dom';
import { createItems } from '../../mocks/mock';
import { withStore } from '../../mocks/mock-components';
import CarouselItem from './carousel-item';
import { render, screen } from '@testing-library/react';

describe('carousel item', () => {
  const items = createItems();

  it('shoud render correctly', () => {
    const { withStoreComponent } = withStore(<CarouselItem {...items[0]} />);

    const withBrowserRouter = (
      <BrowserRouter>{withStoreComponent}</BrowserRouter>
    );

    render(withBrowserRouter);

    expect(screen.getByText(items[0].name)).toBeInTheDocument();
  });
});
