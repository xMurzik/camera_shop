import React from 'react';
import Banner from '../../components/banner/banner';
import ItemsList from '../../components/items-list/items-list';
import Pagination from '../../components/pagination/pagination';
import { Link } from 'react-router-dom';
import { Path } from '../../constants/common';
import { useAppSelector } from '../../hooks/redux-hooks';
import { getAllItems } from '../../store/items-slice/items-selectors';
import CatalogSort from '../../components/catalog-sort/catalog-sort';

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
                <div className="catalog__aside">
                  <div className="catalog-filter">
                    <form action="#">
                      <h2 className="visually-hidden">Фильтр</h2>
                      <fieldset className="catalog-filter__block">
                        <legend className="title title--h5">Цена, ₽</legend>
                        <div className="catalog-filter__price-range">
                          <div className="custom-input">
                            <label>
                              <input
                                type="number"
                                name="price"
                                placeholder="от"
                              />
                            </label>
                          </div>
                          <div className="custom-input">
                            <label>
                              <input
                                type="number"
                                name="priceUp"
                                placeholder="до"
                              />
                            </label>
                          </div>
                        </div>
                      </fieldset>
                      <fieldset className="catalog-filter__block">
                        <legend className="title title--h5">Категория</legend>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input type="checkbox" name="photocamera" />
                            <span className="custom-checkbox__icon" />
                            <span className="custom-checkbox__label">
                              Фотокамера
                            </span>
                          </label>
                        </div>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input type="checkbox" name="videocamera" />
                            <span className="custom-checkbox__icon" />
                            <span className="custom-checkbox__label">
                              Видеокамера
                            </span>
                          </label>
                        </div>
                      </fieldset>
                      <fieldset className="catalog-filter__block">
                        <legend className="title title--h5">Тип камеры</legend>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input type="checkbox" name="digital" />
                            <span className="custom-checkbox__icon" />
                            <span className="custom-checkbox__label">
                              Цифровая
                            </span>
                          </label>
                        </div>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input type="checkbox" name="film" disabled />
                            <span className="custom-checkbox__icon" />
                            <span className="custom-checkbox__label">
                              Плёночная
                            </span>
                          </label>
                        </div>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input type="checkbox" name="snapshot" />
                            <span className="custom-checkbox__icon" />
                            <span className="custom-checkbox__label">
                              Моментальная
                            </span>
                          </label>
                        </div>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input type="checkbox" name="collection" disabled />
                            <span className="custom-checkbox__icon" />
                            <span className="custom-checkbox__label">
                              Коллекционная
                            </span>
                          </label>
                        </div>
                      </fieldset>
                      <fieldset className="catalog-filter__block">
                        <legend className="title title--h5">Уровень</legend>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input type="checkbox" name="zero" />
                            <span className="custom-checkbox__icon" />
                            <span className="custom-checkbox__label">
                              Нулевой
                            </span>
                          </label>
                        </div>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input type="checkbox" name="non-professional" />
                            <span className="custom-checkbox__icon" />
                            <span className="custom-checkbox__label">
                              Любительский
                            </span>
                          </label>
                        </div>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input type="checkbox" name="professional" />
                            <span className="custom-checkbox__icon" />
                            <span className="custom-checkbox__label">
                              Профессиональный
                            </span>
                          </label>
                        </div>
                      </fieldset>
                      <button
                        className="btn catalog-filter__reset-btn"
                        type="reset"
                      >
                        Сбросить фильтры
                      </button>
                    </form>
                  </div>
                </div>
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
