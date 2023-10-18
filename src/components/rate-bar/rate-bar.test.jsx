import { render, screen } from '@testing-library/react';
import { describe, expect, it, vitest } from 'vitest';
import RateBar from './rate-bar';

describe('rate bar', () => {
  it('shoud render correctly', () => {
    render(<RateBar register={() => vitest.fn()} watch={() => vitest.fn()} />);
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });
});
