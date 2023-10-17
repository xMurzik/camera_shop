import React from 'react';
import { Link } from 'react-router-dom';
import { Path } from '../../constants/common';
import SearchForm from '../search-form/search-form';
import { useAppSelector } from '../../hooks/redux-hooks';
import { getItemsFromBasket } from '../../store/basket-slice/basket-selectors';

const Header: React.FC = () => {
  const items = useAppSelector(getItemsFromBasket);

  const countItemsBasketIcon = () => {
    const countItems = items.reduce((acc, el) => (acc += el.count), 0);

    return (
      countItems > 0 && (
        <span className="header__basket-count">{countItems}</span>
      )
    );
  };

  return (
    <header className="header" id="header">
      <div className="container">
        <Link
          className="header__logo"
          to={Path.Catalog}
          aria-label="Переход на главную"
        >
          <svg width={100} height={36} aria-hidden="true">
            <use xlinkHref="#icon-logo" />
          </svg>
        </Link>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <Link className="main-nav__link" to={Path.Catalog}>
                Каталог
              </Link>
            </li>
            <li className="main-nav__item">
              <Link className="main-nav__link" to={Path.Catalog}>
                Гарантии
              </Link>
            </li>
            <li className="main-nav__item">
              <Link className="main-nav__link" to={Path.Catalog}>
                Доставка
              </Link>
            </li>
            <li className="main-nav__item">
              <Link className="main-nav__link" to={Path.Catalog}>
                О компании
              </Link>
            </li>
          </ul>
        </nav>
        <SearchForm />
        <Link className="header__basket-link" to={Path.Basket}>
          <svg width={16} height={16} aria-hidden="true">
            <use xlinkHref="#icon-basket" />
          </svg>
          {countItemsBasketIcon()}
        </Link>
      </div>
    </header>
  );
};

export default Header;
