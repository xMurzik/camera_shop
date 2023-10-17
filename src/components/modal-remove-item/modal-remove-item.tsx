import React from 'react';
import UseFocusModal from '../../hooks/use-focus-modal';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import {
  getCurrentActiveDeleteItem,
  getIsShowModalToDelete,
} from '../../store/modal-slice/modal-selectorts';
import { CameraCategory } from '../../constants/sort-filters';
import { onClickOverlayOrExit } from '../../store/modal-slice/modal-slice';
import { deleteAllItems } from '../../store/basket-slice/basket-slice';

const ModalRemoveItem: React.FC = () => {
  const dispatch = useAppDispatch();
  const isActive = useAppSelector(getIsShowModalToDelete);
  const data = useAppSelector(getCurrentActiveDeleteItem);

  const refDiv = UseFocusModal();

  if (!data) {
    return null;
  }

  const onClickOverlay = () => {
    dispatch(onClickOverlayOrExit());
  };

  const onClickDelete = () => {
    dispatch(deleteAllItems(data.id));
    dispatch(onClickOverlayOrExit());
  };

  const categoryValue =
    data.category === CameraCategory.Photocamera
      ? 'фотокамера'
      : data.category.toLocaleLowerCase();

  return (
    <div ref={refDiv} className={`modal ${isActive ? 'is-active' : ''}`}>
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={onClickOverlay} />
        <div className="modal__content">
          <p className="title title--h4">Удалить этот товар?</p>
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
                  {data.type} {categoryValue}
                </li>
                <li className="basket-item__list-item">{data.level} уровень</li>
              </ul>
            </div>
          </div>
          <div className="modal__buttons">
            <button
              className="btn btn--purple modal__btn modal__btn--half-width"
              type="button"
              id="delete-button-modal"
              onClick={onClickDelete}
            >
              Удалить
            </button>
            <button
              onClick={onClickOverlay}
              className="btn btn--transparent modal__btn modal__btn--half-width"
            >
              Продолжить покупки
            </button>
          </div>
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={onClickOverlay}
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

export default ModalRemoveItem;
