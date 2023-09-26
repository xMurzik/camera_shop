import { render, screen } from '@testing-library/react';
import { describe } from 'vitest';
import Footer from './footer';

describe('footer', () => {
  it('shoud render correctly', () => {
    render(<Footer />);

    expect(
      screen.getByText('Интернет-магазин фото- и видеотехники')
    ).toBeInTheDocument();
    expect(screen.getByText('Гарантии')).toBeInTheDocument();
  });
});
