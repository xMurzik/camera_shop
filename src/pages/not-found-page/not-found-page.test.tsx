import { render, screen } from '@testing-library/react';
import { describe } from 'vitest';
import NotFoundPage from './not-found-page';

import { BrowserRouter } from 'react-router-dom';

describe('not found page', () => {
  it('shoud render correctly', () => {
    const withRouter = <BrowserRouter>{<NotFoundPage />}</BrowserRouter>;

    render(withRouter);

    expect(screen.getByText('Page not found')).toBeInTheDocument();
    expect(screen.getByText('Back to catalog')).toBeInTheDocument();
  });
});
