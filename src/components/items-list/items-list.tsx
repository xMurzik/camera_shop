import React, { useMemo } from 'react';
import { useAppSelector } from '../../hooks/redux-hooks';
import { getAllItems } from '../../store/items-slice/items-selectors';
import ItemCard from '../item-card/item-card';
import { useSearchParams } from 'react-router-dom';
import { MAX_ELEMS_ON_ONE_PAGE } from '../../constants/common';
import { filterByParams } from '../../utils/params';

const ItemsList: React.FC = () => {
  const [params] = useSearchParams();
  const items = useAppSelector(getAllItems);

  const allParams = useMemo(
    () => Object.fromEntries(params.entries()),
    [params]
  );

  const pageParam = params.get('page');
  const indexMaxItems = Number(pageParam) * MAX_ELEMS_ON_ONE_PAGE;
  const indexStartItems = indexMaxItems - MAX_ELEMS_ON_ONE_PAGE;

  const filtredItems = filterByParams(items, allParams)?.slice(
    indexStartItems,
    indexMaxItems
  );

  return (
    <div className="cards catalog__cards">
      {filtredItems?.map((el) => (
        <ItemCard key={el.id} {...el} />
      ))}
    </div>
  );
};

export default ItemsList;
