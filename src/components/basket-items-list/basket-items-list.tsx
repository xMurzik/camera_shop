import React from 'react';
import { useAppSelector } from '../../hooks/redux-hooks';
import BasketItem from '../basket-item/basket-item';
import { getItemsFromBasket } from '../../store/basket-slice/basket-selectors';
import s from './basket-items-list.module.scss';

const BasketItemsList: React.FC = () => {
  const itemsBasket = useAppSelector(getItemsFromBasket);

  if (!itemsBasket.length) {
    return (
      <div className={s['container']}>
        <h1 className={s['title']}>Ваша корзина пуста</h1>
      </div>
    );
  }

  return (
    <ul className="basket__list">
      {itemsBasket.map((el) => (
        <BasketItem key={el.id} {...el} />
      ))}
    </ul>
  );
};

export default BasketItemsList;
