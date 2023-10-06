import React from 'react';
import Banner from '../../components/banner/banner';
import ItemsList from '../../components/items-list/items-list';
import Pagination from '../../components/pagination/pagination';
import { Link } from 'react-router-dom';
import { Path } from '../../constants/common';
import { useAppSelector } from '../../hooks/redux-hooks';
import { getAllItems } from '../../store/items-slice/items-selectors';
import CatalogSort from '../../components/catalog-sort/catalog-sort';
import FiltersLeftPanel from '../../components/filters-left-panel/filters-left-panel';

const CatalogPage: React.FC = () => {
  const items = useAppSelector(getAllItems);

  if (!items.length) {
    return null;
  }

  return (
    <div className="wrapper">
      <main>
        <Banner />
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
                  <ItemsList />
                  <Pagination />
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default CatalogPage;
