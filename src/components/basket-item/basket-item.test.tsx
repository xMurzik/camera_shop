import { createFakeStore, createItems } from '../../mocks/mock';
import BasketItem from './basket-item';
import { withStore } from '../../mocks/mock-components';
import { IItemCard } from '../../types/basket';
import { render, screen } from '@testing-library/react';

describe('basket item', () => {
  it('shoud render correctly', () => {
    const fakeStore = createFakeStore();
    const item: Array<IItemCard> = createItems().map((el) => ({
      ...el,
      count: 5,
    }));

    const { withStoreComponent } = withStore(
      <BasketItem {...item[0]} />,
      fakeStore
    );

    render(withStoreComponent);

    expect(screen.getByText(item[0].vendorCode)).toBeInTheDocument();
    expect(screen.getByText('Общая цена:')).toBeInTheDocument();
  });
});
