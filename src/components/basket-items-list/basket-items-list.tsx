import React from 'react';
import { useAppSelector } from '../../hooks/redux-hooks';
import BasketItem from '../basket-item/basket-item';
import { getFiltredItems } from '../../store/items-slice/items-selectors';

const BasketItemsList: React.FC = () => {
  const itemsBasket = useAppSelector(getFiltredItems);
  return (
    <ul className="basket__list">
      {itemsBasket.map((el) => (
        <BasketItem key={el.id} {...el} />
      ))}
    </ul>
  );
};

export default BasketItemsList;
