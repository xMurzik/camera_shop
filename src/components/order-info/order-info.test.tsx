import { describe } from 'vitest';
import { createFakeStore } from '../../mocks/mock';
import { withStore } from '../../mocks/mock-components';
import OrderInfo from './order-info';
import { render, screen } from '@testing-library/react';

describe('order info', () => {
  const fakeStore = createFakeStore();

  it('shoud render correcly', () => {
    const { withStoreComponent } = withStore(<OrderInfo />, fakeStore);

    render(withStoreComponent);

    expect(
      screen.getByText(
        'Если у вас есть промокод на скидку, примените его в этом поле'
      )
    ).toBeInTheDocument();
  });
});
