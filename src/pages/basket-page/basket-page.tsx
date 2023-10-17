import React from 'react';
import BasketItemsList from '../../components/basket-items-list/basket-items-list';
import OrderInfo from '../../components/order-info/order-info';

const BasketPage: React.FC = () => (
  <main>
    <div className="page-content">
      <div className="breadcrumbs">
        <div className="container">
          <ul className="breadcrumbs__list">
            <li className="breadcrumbs__item">
              <a className="breadcrumbs__link" href="index.html">
                Главная
                <svg width={5} height={8} aria-hidden="true">
                  <use xlinkHref="#icon-arrow-mini" />
                </svg>
              </a>
            </li>
            <li className="breadcrumbs__item">
              <a className="breadcrumbs__link" href="catalog.html">
                Каталог
                <svg width={5} height={8} aria-hidden="true">
                  <use xlinkHref="#icon-arrow-mini" />
                </svg>
              </a>
            </li>
            <li className="breadcrumbs__item">
              <span className="breadcrumbs__link breadcrumbs__link--active">
                Корзина
              </span>
            </li>
          </ul>
        </div>
      </div>
      <section className="basket">
        <div className="container">
          <h1 className="title title--h2">Корзина</h1>
          <BasketItemsList />
          <OrderInfo />
        </div>
      </section>
    </div>
  </main>
);

export default BasketPage;
