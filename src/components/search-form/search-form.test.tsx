import { BrowserRouter } from 'react-router-dom';
import { createFakeStore } from '../../mocks/mock';
import { withStore } from '../../mocks/mock-components';
import SearchForm from './search-form';
import { render, screen } from '@testing-library/react';

describe('search form', () => {
  it('should render correctly', () => {
    const fakeStore = createFakeStore();

    const { withStoreComponent } = withStore(<SearchForm />, fakeStore);

    const withRoute = <BrowserRouter>{withStoreComponent}</BrowserRouter>;

    render(withRoute);

    expect(screen.getByText('Сбросить поиск')).toBeInTheDocument();
  });
});
