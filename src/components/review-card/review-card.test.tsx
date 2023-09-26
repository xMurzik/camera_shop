import { render, screen } from '@testing-library/react';
import { describe } from 'vitest';
import ReviewCard from './review-card';
import { createComments } from '../../mocks/mock';

describe('review card', () => {
  const comments = createComments();

  it('shoud render correctly', () => {
    render(<ReviewCard {...comments[0]} />);

    expect(screen.getByText(comments[0].userName)).toBeInTheDocument();
  });
});
