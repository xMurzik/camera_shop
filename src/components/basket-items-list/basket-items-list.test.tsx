import { describe } from 'vitest';
import { datatype } from 'faker';
import { createFakeStore, createItems } from '../../mocks/mock';
import { withStore } from '../../mocks/mock-components';
import BasketItemsList from './basket-items-list';
import { render, screen } from '@testing-library/react';
import { IItemCard } from '../../types/basket';

describe('BasketItemsList', () => {
  it('shoud render correctly', () => {
    const fakeStore = createFakeStore();

    const { withStoreComponent } = withStore(<BasketItemsList />, fakeStore);

    render(withStoreComponent);
    expect(screen.getByText('Ваша корзина пуста')).toBeInTheDocument();
  });

  it('shoud render correctly2', () => {
    const fakeStore = createFakeStore();

    const cardItems: Array<IItemCard> = createItems().map((el) => ({
      ...el,
      count: datatype.number(100),
    }));

    fakeStore.basket.items = [...cardItems];

    const { withStoreComponent } = withStore(<BasketItemsList />, fakeStore);

    render(withStoreComponent);
    expect(screen.getByText(cardItems[0].vendorCode)).toBeInTheDocument();
  });
});
