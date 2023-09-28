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
    <Route path={Path.Catalog} element={<MainLayout />}>
      <Route index element={<CatalogPage />} />
      <Route path={Path.Basket} element={<BasketPage />} />
      <Route path={Path.OneItem} element={<ItemPage />} />
    </Route>
    <Route path={Path.NotFound} element={<NotFoundPage />} />
  </Routes>
);

export default App;
