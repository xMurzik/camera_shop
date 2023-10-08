import { MemoryRouter } from 'react-router-dom';
import LevelBlock from './level-block';
import { render, screen } from '@testing-library/react';

describe('level block', () => {
  it('should render correctly', () => {
    const route = '/?page=1';

    const withRoute = (
      <MemoryRouter initialEntries={[route]}>
        <LevelBlock />
      </MemoryRouter>
    );

    render(withRoute);
    screen.debug();

    expect(screen.getByText('Нулевой')).toBeInTheDocument();
    expect(screen.getByText('Любительский')).toBeInTheDocument();
  });
});
