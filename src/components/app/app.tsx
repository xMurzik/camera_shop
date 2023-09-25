import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CatalogPage from '../../pages/catalog-page/catalog-page';
import BasketPage from '../../pages/basket-page/basket-page';
import MainLayout from '../../layout/main-layout/main-layout';
import { Path } from '../../constants/common';
import ItemPage from '../../pages/item-page/item-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';

const App: React.FC = () => (
  <Routes>
    <Route path={Path.catalog} element={<MainLayout />}>
      <Route index element={<CatalogPage />} />
      <Route path={Path.basket} element={<BasketPage />} />
      <Route path={Path.oneItem} element={<ItemPage />} />
    </Route>
    <Route path={Path.notFound} element={<NotFoundPage />} />
  </Routes>
);

export default App;
