import React from 'react';
import { Link } from 'react-router-dom';
import { IItem } from '../../types/items';

const RATING_ARR = [5, 4, 3, 2, 1];

const ItemCard: React.FC<IItem> = (props) => {
  const {
    name,
    previewImg,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x,
    price,
    rating,
    reviewCount,
  } = props;

  return (
    <div className="product-card">
      <div className="product-card__img">
        <picture>
          <source
            type="image/webp"
            srcSet={`${previewImgWebp}, ${previewImgWebp2x} 2x`}
          />
          <img
            src={previewImg}
            srcSet={`${previewImg2x} 2x`}
            width={280}
            height={240}
            alt={name}
          />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          {RATING_ARR.map((el) => (
            <svg key={el} width={17} height={16} aria-hidden="true">
              <use
                xlinkHref={el >= rating ? '#icon-full-star' : '#icon-star'}
              />
            </svg>
          ))}
          <p className="visually-hidden">Рейтинг: ${rating}</p>
          <p className="rate__count">
            <span className="visually-hidden">Всего оценок:</span>
            {reviewCount}
          </p>
        </div>
        <p className="product-card__title">{name}</p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>
          {price} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <button className="btn btn--purple product-card__btn" type="button">
          Купить
        </button>
        <Link className="btn btn--transparent" to="#">
          Подробнее
        </Link>
      </div>
    </div>
  );
};

export default ItemCard;
