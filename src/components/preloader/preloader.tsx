import React from 'react';
import FiltersLeftPanel from '../filters-left-panel/filters-left-panel';
import { Path } from '../../constants/common';
import { Link } from 'react-router-dom';
import CatalogSort from '../catalog-sort/catalog-sort';
import { RotatingLines } from 'react-loader-spinner';
import s from './preloader.module.scss';

const Preloader: React.FC = () => (
  <main>
    <div className="banner">
      <picture>
        <source
          type="image/webp"
          srcSet="img/content/banner-bg.webp, img/content/banner-bg@2x.webp 2x"
        />
        <img
          src="img/content/banner-bg.jpg"
          srcSet="img/content/banner-bg@2x.jpg 2x"
          width={1280}
          height={280}
          alt="баннер"
        />
      </picture>
    </div>
    <div className="page-content">
      <div className="breadcrumbs">
        <div className="container">
          <ul className="breadcrumbs__list">
            <li className="breadcrumbs__item">
              <Link className="breadcrumbs__link" to={Path.Catalog}>
                Главная
                <svg width={5} height={8} aria-hidden="true">
                  <use xlinkHref="#icon-arrow-mini" />
                </svg>
              </Link>
            </li>
            <li className="breadcrumbs__item">
              <span className="breadcrumbs__link breadcrumbs__link--active">
                Каталог
              </span>
            </li>
          </ul>
        </div>
      </div>
      <section className="catalog">
        <div className="container">
          <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
          <div className="page-content__columns">
            <FiltersLeftPanel />
            <div className="catalog__content">
              <CatalogSort />
              <div className={s['container-items']}>
                <RotatingLines
                  strokeColor="#7575e2"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="250"
                  visible
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
);

export default Preloader;
