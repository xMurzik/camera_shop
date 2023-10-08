import { BrowserRouter } from 'react-router-dom';
import CategoryBlock from './category-block';
import { render, screen } from '@testing-library/react';

describe('Category block', () => {
  it('shoud render correctly', () => {
    const withRoute = (
      <BrowserRouter>
        <CategoryBlock />
      </BrowserRouter>
    );

    render(withRoute);

    expect(screen.getByText('Категория')).toBeInTheDocument();

    expect(screen.getByText('Фотокамера')).toBeInTheDocument();
  });
});
