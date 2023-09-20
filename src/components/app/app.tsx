import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HistoryRouter from '../history-router/history-router';
import browserHistory from '../../browser-history';
import CatalogPage from '../../pages/catalog-page/catalog-page';
import BasketPage from '../../pages/basket-page/basket-page';
import MainLayout from '../../layout/main-layout/main-layout';
import { Path } from '../../constants/common';

const App: React.FC = () => (
  <HistoryRouter history={browserHistory}>
    <Routes>
      <Route path={Path.catalog} element={<MainLayout />}>
        <Route index element={<CatalogPage />} />
        <Route path={Path.basket} element={<BasketPage />} />
      </Route>
    </Routes>
  </HistoryRouter>
);

export default App;
