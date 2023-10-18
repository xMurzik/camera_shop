import { BrowserRouter } from 'react-router-dom';
import { describe } from 'vitest';
import { withStore } from '../../mocks/mock-components';
import { createFakeStore } from '../../mocks/mock';
import ModalThanksBuy from './modal-thanks-buy';
import { render, screen } from '@testing-library/react';

describe('modal thanks', () => {
  it('shoud render correctly', () => {
    const fakeStore = createFakeStore();

    const { withStoreComponent } = withStore(<ModalThanksBuy />, fakeStore);
    const withRoute = <BrowserRouter>{withStoreComponent}</BrowserRouter>;

    render(withRoute);
    expect(screen.getByText('Спасибо за покупку')).toBeInTheDocument();
  });
});
