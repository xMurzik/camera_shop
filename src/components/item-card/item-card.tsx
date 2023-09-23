import React from 'react';
import { Link } from 'react-router-dom';
import { IItem } from '../../types/items';
import RatingStatic from '../rating-static/rating-static';
import { Path } from '../../constants/common';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { onClickBuy } from '../../store/modal-slice/modal-slice';

const ItemCard: React.FC<IItem> = (props) => {
  const {
    name,
    id,
    previewImg,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x,
    price,
    rating,
    reviewCount,
  } = props;

  const dispatch = useAppDispatch();

  const onClickButtonBuy = () => {
    dispatch(onClickBuy(props));
  };

  return (
    <div className="product-card is-active">
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
          <RatingStatic rating={rating} />
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
        <button
          onClick={onClickButtonBuy}
          className="btn btn--purple product-card__btn"
          type="button"
        >
          Купить
        </button>
        <Link className="btn btn--transparent" to={`${Path.catalog}${id}`}>
          Подробнее
        </Link>
      </div>
    </div>
  );
};

export default ItemCard;
