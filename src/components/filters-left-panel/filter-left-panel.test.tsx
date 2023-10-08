import { BrowserRouter } from 'react-router-dom';
import FiltersLeftPanel from './filters-left-panel';
import { render, screen } from '@testing-library/react';
import { withStore } from '../../mocks/mock-components';
import { createFakeStore } from '../../mocks/mock';

describe('filter left panel', () => {
  it('shoud render correctly', () => {
    const { withStoreComponent } = withStore(
      <FiltersLeftPanel />,
      createFakeStore()
    );

    const withRoute = <BrowserRouter>{withStoreComponent}</BrowserRouter>;

    render(withRoute);

    expect(screen.getByText('Сбросить фильтры')).toBeInTheDocument();
  });
});
