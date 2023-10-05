import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Param, Sort, SortCount } from '../../constants/sort-filters';

const CatalogSort: React.FC = () => {
  const [params, setParam] = useSearchParams();

  const setTypeSort = (evt: React.ChangeEvent<HTMLInputElement>) => {
    params.set(Param.sortType, evt.target.id);
    setParam(params);
  };

  const setCount = (evt: React.ChangeEvent<HTMLInputElement>) => {
    params.set('sortCount', evt.target.id);
    setParam(params);
  };

  return (
    <div className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            <div className="catalog-sort__btn-text">
              <input
                onChange={setTypeSort}
                type="radio"
                checked={params.get('sortType') === Sort.Price}
                id="sortPrice"
                name="sort"
              />
              <label htmlFor="sortPrice">по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              <input
                onChange={setTypeSort}
                checked={params.get('sortType') === Sort.Popular}
                type="radio"
                id="sortPopular"
                name="sort"
              />
              <label htmlFor="sortPopular">по популярности</label>
            </div>
          </div>
          <div className="catalog-sort__order">
            <div className="catalog-sort__btn catalog-sort__btn--up">
              <input
                type="radio"
                id="up"
                name="sort-icon"
                onChange={setCount}
                checked={params.get('sortCount') === SortCount.Up}
                aria-label="По возрастанию"
              />
              <label htmlFor="up">
                <svg width={16} height={14} aria-hidden="true">
                  <use xlinkHref="#icon-sort" />
                </svg>
              </label>
            </div>
            <div className="catalog-sort__btn catalog-sort__btn--down">
              <input
                type="radio"
                id="down"
                checked={params.get('sortCount') === SortCount.Down}
                onChange={setCount}
                name="sort-icon"
                aria-label="По убыванию"
              />
              <label htmlFor="down">
                <svg width={16} height={14} aria-hidden="true">
                  <use xlinkHref="#icon-sort" />
                </svg>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CatalogSort;
