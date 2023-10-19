import { render, screen } from '@testing-library/react';
import { describe } from 'vitest';
import ModalReview from './modal-review';
import { withStore } from '../../mocks/mock-components';
import { createFakeStore } from '../../mocks/mock';

describe('modal review', () => {
  const fakeStore = createFakeStore();
  it('shoud render correctly', () => {
    const ref = { current: null };

    const { withStoreComponent } = withStore(
      <ModalReview
        isActive
        setIsShowModalOverlay={() => undefined}
        setIsShowModalSuccess={() => undefined}
        refButton={ref}
      />,
      fakeStore
    );
    render(withStoreComponent);

    expect(screen.getByText('Оставить отзыв')).toBeInTheDocument();

    expect(screen.getByText('Рейтинг')).toBeInTheDocument();
  });
});
