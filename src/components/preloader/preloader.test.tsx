import { render, screen } from '@testing-library/react';
import Preloader from './preloader';
import { BrowserRouter } from 'react-router-dom';
import { withStore } from '../../mocks/mock-components';
import { createFakeStore } from '../../mocks/mock';

describe('preloader', () => {
  it('shoud render correctly', () => {
    const fakeStore = createFakeStore();
    fakeStore.items.isLoading = true;

    const { withStoreComponent } = withStore(<Preloader />, fakeStore);

    const withRoute = <BrowserRouter>{withStoreComponent}</BrowserRouter>;

    render(withRoute);

    screen.debug();

    expect(screen.getByText('Главная')).toBeInTheDocument();
    expect(screen.getByText('Каталог')).toBeInTheDocument();
  });
});
