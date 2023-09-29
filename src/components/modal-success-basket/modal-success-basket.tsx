import React from 'react';
import { Link } from 'react-router-dom';
import { Path } from '../../constants/common';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { getIsShowModalSuccesBasket } from '../../store/modal-slice/modal-selectorts';
import { onClickOverlayOrExit } from '../../store/modal-slice/modal-slice';
import UseFocusModal from '../../hooks/use-focus-modal';

const ModalSuccessBasket: React.FC = () => {
  const dispatch = useAppDispatch();
  const isActive = useAppSelector(getIsShowModalSuccesBasket);

  const onClickOverlay = () => {
    dispatch(onClickOverlayOrExit());
  };

  const refModalDiv = UseFocusModal();

  return (
    <div className={`modal ${isActive ? 'is-active' : ''} modal--narrow`}>
      <div className="modal__wrapper">
        <div onClick={onClickOverlay} className="modal__overlay"></div>
        <div ref={refModalDiv} className="modal__content">
          <p className="title title--h4">Товар успешно добавлен в корзину</p>

          <svg
            className="modal__icon"
            width="86"
            height="80"
            aria-hidden="true"
          >
            <use xlinkHref="#icon-success"></use>
          </svg>
          <div className="modal__buttons">
            <button
              onClick={onClickOverlay}
              className="btn btn--transparent modal__btn"
              id="cont-to-buy"
            >
              Продолжить покупки
            </button>
            <Link
              onClick={onClickOverlay}
              to={`${Path.Basket}`}
              className="btn btn--purple modal__btn modal__btn--fit-width"
            >
              Перейти в корзину
            </Link>
          </div>
          <button
            onClick={onClickOverlay}
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
          >
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalSuccessBasket;
