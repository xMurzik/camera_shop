import React from 'react';
import { Link } from 'react-router-dom';
import { IItem } from '../../types/items';
import RatingStatic from '../rating-static/rating-static';
import { Path } from '../../constants/common';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { onClickBuy } from '../../store/modal-slice/modal-slice';
import { formatPrice } from '../../utils/format';
import { getItemsFromBasket } from '../../store/basket-slice/basket-selectors';

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

  const itemsFromBasket = useAppSelector(getItemsFromBasket);

  const onClickButtonBuy = () => {
    dispatch(onClickBuy(props));
  };

  const itemsButtons = () => {
    const isItemInBasket = itemsFromBasket.some((el) => el.id === id);

    return isItemInBasket ? (
      <Link className="btn btn--purple-border" to={`${Path.Basket}`}>
        <svg width="16" height="16" aria-hidden="true">
          <use xlinkHref="#icon-basket"></use>
        </svg>
        В корзине
      </Link>
    ) : (
      <button
        onClick={onClickButtonBuy}
        className="btn btn--purple product-card__btn"
        type="button"
        data-testid="buy_button"
      >
        Купить
      </button>
    );
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
          {formatPrice(price)} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        {itemsButtons()}
        <Link
          data-testid="button_more_info"
          className="btn btn--transparent"
          to={`${Path.Catalog}${id}`}
        >
          Подробнее
        </Link>
      </div>
    </div>
  );
};

export default ItemCard;
