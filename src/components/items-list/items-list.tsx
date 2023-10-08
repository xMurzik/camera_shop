import React, { useLayoutEffect } from 'react';
import { useAppSelector } from '../../hooks/redux-hooks';
import { getAllItems } from '../../store/items-slice/items-selectors';
import ItemCard from '../item-card/item-card';
import { useSearchParams } from 'react-router-dom';
import { MAX_ELEMS_ON_ONE_PAGE } from '../../constants/common';
import { filterSortAll } from '../../utils/params';
import { FilterParam } from '../../constants/sort-filters';
import s from './items-list.module.scss';

const ItemsList: React.FC = () => {
  const [params, setParams] = useSearchParams();
  const items = useAppSelector(getAllItems);

  useLayoutEffect(() => {
    params.delete(FilterParam.PriceMax);
    params.delete(FilterParam.PriceMin);

    setParams(params);
  }, []);

  const pageParam = params.get('page');
  const indexMaxItems = Number(pageParam) * MAX_ELEMS_ON_ONE_PAGE;
  const indexStartItems = indexMaxItems - MAX_ELEMS_ON_ONE_PAGE;

  const filtredItems = filterSortAll(items).slice(
    indexStartItems,
    indexMaxItems
  );

  return filtredItems.length ? (
    <div className="cards catalog__cards">
      {filtredItems.map((el) => (
        <ItemCard key={el.id} {...el} />
      ))}
    </div>
  ) : (
    <div className={s['not-found']}>
      <h1>Таких камер нет в наличии</h1>
    </div>
  );
};

export default ItemsList;
