import { render, screen } from '@testing-library/react';
import { describe } from 'vitest';
import Footer from './footer';
import { BrowserRouter } from 'react-router-dom';

describe('footer', () => {
  it('shoud render correctly', () => {
    const withRouter = (
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    render(withRouter);

    expect(
      screen.getByText('Интернет-магазин фото- и видеотехники')
    ).toBeInTheDocument();
    expect(screen.getByText('Гарантии')).toBeInTheDocument();
  });
});
