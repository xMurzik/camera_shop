import React from 'react';
import { Link } from 'react-router-dom';
import { Path } from '../../constants/common';

const Footer: React.FC = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer__info">
        <Link
          className="footer__logo"
          to={Path.Catalog}
          aria-label="Переход на главную"
        >
          <svg width={100} height={36} aria-hidden="true">
            <use xlinkHref="#icon-logo-mono" />
          </svg>
        </Link>
        <p className="footer__description">
          Интернет-магазин фото- и видеотехники
        </p>
        <ul className="social">
          <li className="social__item">
            <Link
              className="link"
              to={Path.Catalog}
              aria-label="Переход на страницу вконтатке"
            >
              <svg width={20} height={20} aria-hidden="true">
                <use xlinkHref="#icon-vk" />
              </svg>
            </Link>
          </li>
          <li className="social__item">
            <Link
              className="link"
              to={Path.Catalog}
              aria-label="Переход на страницу pinterest"
            >
              <svg width={20} height={20} aria-hidden="true">
                <use xlinkHref="#icon-pinterest" />
              </svg>
            </Link>
          </li>
          <li className="social__item">
            <Link
              className="link"
              to={Path.Catalog}
              aria-label="Переход на страницу reddit"
            >
              <svg width={20} height={20} aria-hidden="true">
                <use xlinkHref="#icon-reddit" />
              </svg>
            </Link>
          </li>
        </ul>
      </div>
      <ul className="footer__nav">
        <li className="footer__nav-item">
          <p className="footer__title">Навигация</p>
          <ul className="footer__list">
            <li className="footer__item">
              <Link className="link" to={Path.Catalog}>
                Каталог
              </Link>
            </li>
            <li className="footer__item">
              <Link className="link" to={Path.Catalog}>
                Гарантии
              </Link>
            </li>
            <li className="footer__item">
              <Link className="link" to={Path.Catalog}>
                Доставка
              </Link>
            </li>
            <li className="footer__item">
              <Link className="link" to={Path.Catalog}>
                О компании
              </Link>
            </li>
          </ul>
        </li>
        <li className="footer__nav-item">
          <p className="footer__title">Ресурсы</p>
          <ul className="footer__list">
            <li className="footer__item">
              <Link className="link" to={Path.Catalog}>
                Курсы операторов
              </Link>
            </li>
            <li className="footer__item">
              <Link className="link" to={Path.Catalog}>
                Блог
              </Link>
            </li>
            <li className="footer__item">
              <Link className="link" to={Path.Catalog}>
                Сообщество
              </Link>
            </li>
          </ul>
        </li>
        <li className="footer__nav-item">
          <p className="footer__title">Поддержка</p>
          <ul className="footer__list">
            <li className="footer__item">
              <Link className="link" to={Path.Catalog}>
                FAQ
              </Link>
            </li>
            <li className="footer__item">
              <Link className="link" to={Path.Catalog}>
                Задать вопрос
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </footer>
);

export default Footer;
