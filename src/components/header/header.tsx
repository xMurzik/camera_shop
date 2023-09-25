import React from 'react';
import { Link } from 'react-router-dom';
import { Path } from '../../constants/common';

const Header: React.FC = () => (
  <header className="header" id="header">
    <div className="container">
      <a
        className="header__logo"
        href="index.html"
        aria-label="Переход на главную"
      >
        <svg width={100} height={36} aria-hidden="true">
          <use xlinkHref="#icon-logo" />
        </svg>
      </a>
      <nav className="main-nav header__main-nav">
        <ul className="main-nav__list">
          <li className="main-nav__item">
            <Link className="main-nav__link" to={Path.catalog}>
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
      <div className="form-search">
        <form>
          <label>
            <svg
              className="form-search__icon"
              width={16}
              height={16}
              aria-hidden="true"
            >
              <use xlinkHref="#icon-lens" />
            </svg>
            <input
              className="form-search__input"
              type="text"
              autoComplete="off"
              placeholder="Поиск по сайту"
            />
          </label>
          <ul className="form-search__select-list">
            <li className="form-search__select-item" tabIndex={0}>
              Cannonball Pro MX 8i
            </li>
            <li className="form-search__select-item" tabIndex={0}>
              Cannonball Pro MX 7i
            </li>
            <li className="form-search__select-item" tabIndex={0}>
              Cannonball Pro MX 6i
            </li>
            <li className="form-search__select-item" tabIndex={0}>
              Cannonball Pro MX 5i
            </li>
            <li className="form-search__select-item" tabIndex={0}>
              Cannonball Pro MX 4i
            </li>
          </ul>
        </form>
        <button className="form-search__reset" type="reset">
          <svg width={10} height={10} aria-hidden="true">
            <use xlinkHref="#icon-close" />
          </svg>
          <span className="visually-hidden">Сбросить поиск</span>
        </button>
      </div>
      <Link className="header__basket-link" to={Path.basket}>
        <svg width={16} height={16} aria-hidden="true">
          <use xlinkHref="#icon-basket" />
        </svg>
      </Link>
    </div>
  </header>
);

export default Header;
