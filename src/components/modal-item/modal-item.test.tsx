import { BrowserRouter } from 'react-router-dom';
import { createFakeStore } from '../../mocks/mock';
import { withStore } from '../../mocks/mock-components';
import App from '../app/app';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('modal item', () => {
  const fakeStore = createFakeStore();

  it('on click catalog page', async () => {
    const { withStoreComponent } = withStore(<App />, fakeStore);
    const withBrowserRouter = (
      <BrowserRouter>{withStoreComponent}</BrowserRouter>
    );

    render(withBrowserRouter);
    const user = userEvent.setup();

    await user.click(screen.getAllByTestId('buy_button')[0]);

    expect(screen.getByText('Добавить товар в корзину')).toBeInTheDocument();
    expect(
      screen.getByText(
        `${fakeStore.modal.currentActiveCatalogItem?.name as string}`
      )
    ).toBeInTheDocument();
  });
});
