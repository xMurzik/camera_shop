import React from 'react';
import { IItem } from '../../types/items';

const BasketItem: React.FC<IItem> = () => (
  <li className="basket-item">
    <div className="basket-item__img">
      <picture>
        <source
          type="image/webp"
          srcSet="img/content/orlenok.webp, img/content/orlenok@2x.webp 2x"
        />
        <img
          src="img/content/orlenok.jpg"
          srcSet="img/content/orlenok@2x.jpg 2x"
          width={140}
          height={120}
          alt="Фотоаппарат «Орлёнок»"
        />
      </picture>
    </div>
    <div className="basket-item__description">
      <p className="basket-item__title">Орлёнок</p>
      <ul className="basket-item__list">
        <li className="basket-item__list-item">
          <span className="basket-item__article">Артикул:</span>{' '}
          <span className="basket-item__number">O78DFGSD832</span>
        </li>
        <li className="basket-item__list-item">Плёночная фотокамера</li>
        <li className="basket-item__list-item">Любительский уровень</li>
      </ul>
    </div>
    <p className="basket-item__price">
      <span className="visually-hidden">Цена:</span>18 970 ₽
    </p>
    <div className="quantity">
      <button
        className="btn-icon btn-icon--prev"
        aria-label="уменьшить количество товара"
      >
        <svg width={7} height={12} aria-hidden="true">
          <use xlinkHref="#icon-arrow" />
        </svg>
      </button>
      <label className="visually-hidden" htmlFor="counter1" />
      <input
        type="number"
        id="counter1"
        defaultValue={2}
        min={1}
        max={99}
        aria-label="количество товара"
      />
      <button
        className="btn-icon btn-icon--next"
        aria-label="увеличить количество товара"
      >
        <svg width={7} height={12} aria-hidden="true">
          <use xlinkHref="#icon-arrow" />
        </svg>
      </button>
    </div>
    <div className="basket-item__total-price">
      <span className="visually-hidden">Общая цена:</span>37 940 ₽
    </div>
    <button className="cross-btn" type="button" aria-label="Удалить товар">
      <svg width={10} height={10} aria-hidden="true">
        <use xlinkHref="#icon-close" />
      </svg>
    </button>
  </li>
);

export default BasketItem;
