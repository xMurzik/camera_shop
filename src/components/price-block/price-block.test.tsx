import { BrowserRouter } from 'react-router-dom';
import PriceBlock from './price-block';
import { render, screen } from '@testing-library/react';
import { withStore } from '../../mocks/mock-components';
import { createFakeStore } from '../../mocks/mock';

describe('price block', () => {
  it('shoud render correctly', () => {
    const maxValueInput = { current: null };
    const minValueInput = { current: null };

    const withRouter = (
      <BrowserRouter>
        <PriceBlock
          maxValueInput={maxValueInput}
          minValueInput={minValueInput}
        />
      </BrowserRouter>
    );

    const { withStoreComponent } = withStore(withRouter, createFakeStore());

    render(withStoreComponent);

    screen.debug();

    expect(screen.getByText('Цена, ₽')).toBeInTheDocument();
  });
});
