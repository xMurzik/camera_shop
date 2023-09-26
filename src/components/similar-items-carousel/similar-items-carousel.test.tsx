import { describe } from 'vitest';
import SimilarItemsCarousel from './similar-items-carousel';
import { render } from '@testing-library/react';
import { withStore } from '../../mocks/mock-components';
import { createFakeStore } from '../../mocks/mock';
import { BrowserRouter } from 'react-router-dom';

describe('similar items carousel', () => {
  const fakeStore = createFakeStore();

  it('shoud render correctly', () => {
    const { withStoreComponent } = withStore(
      <SimilarItemsCarousel />,
      fakeStore
    );

    const withRouter = <BrowserRouter>{withStoreComponent}</BrowserRouter>;

    const { container } = render(withRouter);

    expect(
      container.querySelector('.page-content__section')
    ).toBeInTheDocument();
  });
});
