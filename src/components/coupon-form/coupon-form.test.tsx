import { describe } from 'vitest';
import { createFakeStore } from '../../mocks/mock';
import { withStore } from '../../mocks/mock-components';
import CouponForm from './coupon-form';
import { render, screen } from '@testing-library/react';

describe('coupin form', () => {
  it('shoud render correctly', () => {
    const fakeStore = createFakeStore();

    const { withStoreComponent } = withStore(<CouponForm />, fakeStore);

    render(withStoreComponent);
    expect(screen.getByText('Промокод')).toBeInTheDocument();
  });
});
