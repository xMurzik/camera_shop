import React from 'react';
import { Link } from 'react-router-dom';
import { Path } from '../../constants/common';
import SearchForm from '../search-form/search-form';

const Header: React.FC = () => (
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
            <a className="main-nav__link" href="#">
              Гарантии
            </a>
          </li>
          <li className="main-nav__item">
            <a className="main-nav__link" href="#">
              Доставка
            </a>
          </li>
          <li className="main-nav__item">
            <a className="main-nav__link" href="#">
              О компании
            </a>
          </li>
        </ul>
      </nav>
      <SearchForm />
      <Link className="header__basket-link" to={Path.Basket}>
        <svg width={16} height={16} aria-hidden="true">
          <use xlinkHref="#icon-basket" />
        </svg>
      </Link>
    </div>
  </header>
);

export default Header;
