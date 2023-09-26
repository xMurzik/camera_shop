import { render, screen } from '@testing-library/react';
import { describe } from 'vitest';
import ModalSuccessBasket from './modal-success-basket';
import { createFakeStore } from '../../mocks/mock';
import { withStore } from '../../mocks/mock-components';
import { BrowserRouter } from 'react-router-dom';

describe('modal success basket', () => {
  const fakeStore = createFakeStore();
  it('shoud render correctly', () => {
    fakeStore.modal.isShowModalSuccesBasket = true;

    const { withStoreComponent } = withStore(<ModalSuccessBasket />, fakeStore);
    const withBrowserRouter = (
      <BrowserRouter>{withStoreComponent}</BrowserRouter>
    );
    render(withBrowserRouter);

    expect(
      screen.getByText('Товар успешно добавлен в корзину')
    ).toBeInTheDocument();
  });
});
