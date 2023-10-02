import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import {
  getCurrentActiveBasketItem,
  getCurrentActiveCatalogItem,
  getIsShowModalToBuy,
} from '../../store/modal-slice/modal-selectorts';
import {
  onClickOverlayOrExit,
  onClickSuccessBuy,
} from '../../store/modal-slice/modal-slice';
import UseFocusModal from '../../hooks/use-focus-modal';
import { formatPrice } from '../../utils/format';

interface IModalItemProps {
  isDelete: boolean;
}

const ModalItem: React.FC<IModalItemProps> = (props) => {
  const dispatch = useAppDispatch();
  const { isDelete } = props;
  const isActive = useAppSelector(getIsShowModalToBuy);
  const data = useAppSelector(
    isDelete ? getCurrentActiveBasketItem : getCurrentActiveCatalogItem
  );

  const onClickExit = () => {
    dispatch(onClickOverlayOrExit());
  };

  const onClickButtonSuccessBuy = () => {
    if (data) {
      dispatch(onClickSuccessBuy());
    }
  };

  const refModalDiv = UseFocusModal();

  if (!data) {
    return null;
  }

  return (
    <div ref={refModalDiv} className={`modal ${isActive ? 'is-active' : ''}`}>
      <div className="modal__wrapper">
        <div onClick={onClickExit} className="modal__overlay" />
        <div className="modal__content">
          <p className="title title--h4">
            {isDelete ? 'Удалить этот товар?' : 'Добавить товар в корзину'}
          </p>
          <div className="basket-item basket-item--short">
            <div className="basket-item__img">
              <picture>
                <source
                  type="image/webp"
                  srcSet={`${data.previewImgWebp}, ${data.previewImgWebp2x} 2x`}
                />
                <img
                  src={data.previewImg}
                  srcSet={`${data.previewImg2x} 2x`}
                  width={140}
                  height={120}
                  alt={data.name}
                />
              </picture>
            </div>
            <div className="basket-item__description">
              <p className="basket-item__title">{data.name}</p>
              <ul className="basket-item__list">
                <li className="basket-item__list-item">
                  <span className="basket-item__article">Артикул:</span>{' '}
                  <span className="basket-item__number">{data.vendorCode}</span>
                </li>
                <li className="basket-item__list-item">
                  {data.type} фотокамера
                </li>
                <li className="basket-item__list-item">{data.level} уровень</li>
              </ul>
              {!isDelete && (
                <p className="basket-item__price">
                  <span className="visually-hidden">Цена:</span>
                  {formatPrice(data.price)} ₽
                </p>
              )}
            </div>
          </div>
          {isDelete ? (
            <div className="modal__buttons">
              <button
                className="btn btn--purple modal__btn modal__btn--half-width"
                type="button"
              >
                Удалить
              </button>
              <a
                className="btn btn--transparent modal__btn modal__btn--half-width"
                href="#"
              >
                Продолжить покупки
              </a>
            </div>
          ) : (
            <div className="modal__buttons">
              <button
                className="btn btn--purple modal__btn modal__btn--fit-width"
                type="button"
                id="add-item-to-basket"
                onClick={onClickButtonSuccessBuy}
              >
                <svg width="24" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-add-basket"></use>
                </svg>
                Добавить в корзину
              </button>
            </div>
          )}
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={onClickExit}
          >
            <svg width={10} height={10} aria-hidden="true">
              <use xlinkHref="#icon-close" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalItem;
