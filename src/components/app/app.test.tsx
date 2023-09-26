import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { withStore } from '../../mocks/mock-components';
import App from './app';
import { createFakeStore } from '../../mocks/mock';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

describe('app', () => {
  it('main page', () => {
    const { withStoreComponent } = withStore(<App />, createFakeStore());
    const withBrowserRouter = (
      <BrowserRouter>{withStoreComponent}</BrowserRouter>
    );

    render(withBrowserRouter);

    expect(
      screen.getByText('Каталог фото- и видеотехники')
    ).toBeInTheDocument();
  });

  it('item page', async () => {
    const { withStoreComponent } = withStore(<App />, createFakeStore());
    const withBrowserRouter = (
      <BrowserRouter>{withStoreComponent}</BrowserRouter>
    );

    render(withBrowserRouter);

    const user = userEvent.setup();

    await user.click(screen.getAllByTestId('button_more_info')[0]);

    expect(screen.getByText('Похожие товары')).toBeInTheDocument();
  });

  it('bad routing', () => {
    const badRoute = '/some/bad/route';

    render(
      <MemoryRouter initialEntries={[badRoute]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });
});
