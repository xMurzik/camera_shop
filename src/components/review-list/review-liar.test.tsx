import { describe } from 'vitest';
import { withStore } from '../../mocks/mock-components';
import ReviewList from './review-list';
import { createFakeStore } from '../../mocks/mock';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

describe('review list', () => {
  const fakeStore = createFakeStore();
  it('shoud render correctly', () => {
    const { withStoreComponent } = withStore(<ReviewList />, fakeStore);

    const withRouter = <BrowserRouter>{withStoreComponent}</BrowserRouter>;

    render(withRouter);

    expect(screen.getByText('Оставить свой отзыв')).toBeInTheDocument();
  });
});
