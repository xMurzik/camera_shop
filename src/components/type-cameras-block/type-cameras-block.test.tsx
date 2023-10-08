import { BrowserRouter } from 'react-router-dom';
import TypeCamerasBlock from './type-cameras-block';
import { render, screen } from '@testing-library/react';

describe('type cameras', () => {
  it('shoud render correctly', () => {
    const withRoute = (
      <BrowserRouter>
        <TypeCamerasBlock />
      </BrowserRouter>
    );

    render(withRoute);

    screen.debug();

    expect(screen.getByText('Тип камеры')).toBeInTheDocument();
    expect(screen.getByText('Коллекционная')).toBeInTheDocument();
    expect(screen.getByText('Моментальная')).toBeInTheDocument();
  });
});
