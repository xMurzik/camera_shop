import { render, screen } from '@testing-library/react';
import { describe } from 'vitest';
import RatingStatic from './rating-static';

describe('rating static', () => {
  it('shoud render correctly', () => {
    render(<RatingStatic rating={4} />);

    expect(screen.getAllByTestId('star').length).toBe(5);
  });
});
