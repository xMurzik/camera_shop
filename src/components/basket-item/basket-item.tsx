import React, { useState, useRef } from 'react';
import { IItemCard } from '../../types/basket';
import { formatPrice } from '../../utils/format';
import { useAppDispatch } from '../../hooks/redux-hooks';
import {
  decreaseCountItem,
  increaseCountItem,
  setCountItem,
} from '../../store/basket-slice/basket-slice';
import { toast } from 'react-toastify';
import { CameraCategory } from '../../constants/sort-filters';
import { onClickDeleteButton } from '../../store/modal-slice/modal-slice';

const BasketItem: React.FC<IItemCard> = (props) => {
  const {
    id,
    count,
    name,
    level,
    vendorCode,
    type,
    category,
    previewImg,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x,
    price,
  } = props;
  const refInput = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  const [countValue, setCountValue] = useState(count);

  const onClickDeleteItems = () => {
    dispatch(onClickDeleteButton(props));
  };

  const onClickIncreaseButton = () => {
    dispatch(increaseCountItem(id));
    setCountValue((prev) => prev + 1);
  };

  const onClickDecreaseButton = () => {
    dispatch(decreaseCountItem(id));
    setCountValue((prev) => prev - 1);
  };

  const inputAction = (value: number) => {
    if (Number(value) <= 0) {
      dispatch(setCountItem({ id, count: 1 }));
      setCountValue(1);
      toast.warn('Нельзя воодить значения меньше 1');
    } else if (Number(value) > 99) {
      dispatch(setCountItem({ id, count: 99 }));
      setCountValue(99);
      toast.warn('Нельзя воодить значения больше 99');
    } else {
      setCountValue(Number(value));
      dispatch(setCountItem({ id, count: Number(value) }));
    }
  };

  const onChangeInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setCountValue(Number(evt.target.value.replace(/\D/gi, '')));
  };

  const onBlurInput = (evt: React.FocusEvent<HTMLInputElement, Element>) => {
    inputAction(Number(evt.target.value));
  };

  const onClickEnter = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    const { target } = evt;
    if (evt.key === 'Enter') {
      if (target instanceof HTMLInputElement) {
        if (refInput.current) {
          refInput.current.blur();
        }
      }
    }
  };

  const categoryValue =
    category === CameraCategory.Photocamera
      ? 'фотокамера'
      : category.toLocaleLowerCase();

  return (
    <li className="basket-item">
      <div className="basket-item__img">
        <picture>
          <source
            type="image/webp"
            srcSet={`${previewImgWebp}, ${previewImgWebp2x} 2x`}
          />
          <img
            src={previewImg}
            srcSet={`${previewImg2x} 2x`}
            width={140}
            height={120}
            alt={name}
          />
        </picture>
      </div>
      <div className="basket-item__description">
        <p className="basket-item__title">{name}</p>
        <ul className="basket-item__list">
          <li className="basket-item__list-item">
            <span className="basket-item__article">Артикул:</span>{' '}
            <span className="basket-item__number">{vendorCode}</span>
          </li>
          <li className="basket-item__list-item">{`${type} ${categoryValue}`}</li>
          <li className="basket-item__list-item">{level} уровень</li>
        </ul>
      </div>
      <p className="basket-item__price">
        <span className="visually-hidden">Цена:</span>
        {formatPrice(price)} ₽
      </p>
      <div className="quantity">
        <button
          disabled={count <= 1}
          onClick={onClickDecreaseButton}
          className="btn-icon btn-icon--prev"
          aria-label="уменьшить количество товара"
        >
          <svg width={7} height={12} aria-hidden="true">
            <use xlinkHref="#icon-arrow" />
          </svg>
        </button>
        <label className="visually-hidden" htmlFor="counter1" />
        <input
          ref={refInput}
          type="text"
          id="counter1"
          pattern="/\d{1,2}/"
          onBlur={onBlurInput}
          onChange={onChangeInput}
          onKeyDown={onClickEnter}
          value={countValue}
          min={1}
          max={99}
          aria-label="количество товара"
        />
        <button
          disabled={count >= 99}
          onClick={onClickIncreaseButton}
          className="btn-icon btn-icon--next"
          aria-label="увеличить количество товара"
        >
          <svg width={7} height={12} aria-hidden="true">
            <use xlinkHref="#icon-arrow" />
          </svg>
        </button>
      </div>
      <div className="basket-item__total-price">
        <span className="visually-hidden">Общая цена:</span>
        {formatPrice(count * price)} ₽
      </div>
      <button
        onClick={onClickDeleteItems}
        className="cross-btn"
        type="button"
        aria-label="Удалить товар"
      >
        <svg width={10} height={10} aria-hidden="true">
          <use xlinkHref="#icon-close" />
        </svg>
      </button>
    </li>
  );
};

export default BasketItem;
