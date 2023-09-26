import { render, screen } from '@testing-library/react';
import { describe } from 'vitest';
import Header from './header';
import { BrowserRouter } from 'react-router-dom';

describe('header', () => {
  it('shoud render correctly', () => {
    const withRouter = (
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    render(withRouter);

    expect(screen.getByText('Гарантии')).toBeInTheDocument();
    expect(screen.getByText('Доставка')).toBeInTheDocument();
    expect(screen.getByText('Сбросить поиск')).toBeInTheDocument();
  });
});
