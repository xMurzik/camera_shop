import { render, screen } from '@testing-library/react';
import { describe } from 'vitest';
import Header from './header';
import { BrowserRouter } from 'react-router-dom';
import { withStore } from '../../mocks/mock-components';
import { createFakeStore } from '../../mocks/mock';

describe('header', () => {
  it('shoud render correctly', () => {
    const { withStoreComponent } = withStore(<Header />, createFakeStore());

    const withRouter = <BrowserRouter>{withStoreComponent}</BrowserRouter>;

    render(withRouter);

    screen.debug();

    expect(screen.getByText('Гарантии')).toBeInTheDocument();
    expect(screen.getByText('Доставка')).toBeInTheDocument();
    expect(screen.getByText('Сбросить поиск')).toBeInTheDocument();
  });
});
