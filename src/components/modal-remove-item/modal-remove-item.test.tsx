import { describe } from 'vitest';
import { createFakeStore } from '../../mocks/mock';
import { withStore } from '../../mocks/mock-components';
import ModalRemoveItem from './modal-remove-item';
import { render, screen } from '@testing-library/react';

describe('modal remove item', () => {
  it('shoud render correctly', () => {
    const fakeStore = createFakeStore();

    const { withStoreComponent } = withStore(<ModalRemoveItem />, fakeStore);

    render(withStoreComponent);

    if (fakeStore.modal.currentActiveDeleteItem) {
      expect(
        screen.getByText(
          `${fakeStore.modal.currentActiveDeleteItem.level} уровень`
        )
      ).toBeInTheDocument();
      screen.debug();
    }

    expect(screen.getByText('Продолжить покупки')).toBeInTheDocument();
  });
});
