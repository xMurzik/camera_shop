import React from 'react';
import { useAppSelector } from '../../hooks/redux-hooks';
import { getItemsFromBasket } from '../../store/basket-slice/basket-selectors';
import BasketItem from '../basket-item/basket-item';

const BasketItemsList: React.FC = () => {
  const itemsBasket = useAppSelector(getItemsFromBasket);
  return (
    <ul className="basket__list">
      {itemsBasket.map((el) => (
        <BasketItem key={el.id} {...el} />
      ))}
    </ul>
  );
};

export default BasketItemsList;
