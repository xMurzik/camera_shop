import React from 'react';
import { useAppSelector } from '../../hooks/redux-hooks';
import { getAllItems } from '../../store/items-slice/items-selectors';
import ItemCard from '../item-card/item-card';

const ItemsList: React.FC = () => {
  const items = useAppSelector(getAllItems);

  return (
    <div className="cards catalog__cards">
      {items.map((el) => (
        <ItemCard key={el.id} {...el} />
      ))}
    </div>
  );
};

export default ItemsList;
