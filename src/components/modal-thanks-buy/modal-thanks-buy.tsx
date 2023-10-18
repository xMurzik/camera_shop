import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import UseFocusModal from '../../hooks/use-focus-modal';
import { onClickOverlayOrExit } from '../../store/modal-slice/modal-slice';
import { getIsShowThankForBuy } from '../../store/modal-slice/modal-selectorts';
import { Path, TIMEOUT_SUCCESS } from '../../constants/common';

const ModalThanksBuy: React.FC = () => {
  const dispatch = useAppDispatch();
  const refDiv = UseFocusModal();
  const navigate = useNavigate();

  const isShow = useAppSelector(getIsShowThankForBuy);

  const onClickExit = () => {
    dispatch(onClickOverlayOrExit());
  };

  const onClickBackToShop = () => {
    onClickExit();

    setTimeout(() => {
      navigate(Path.Catalog);
    }, TIMEOUT_SUCCESS);
  };

  return (
    <div
      ref={refDiv}
      className={`modal ${isShow ? 'is-active' : ''}  modal--narrow`}
    >
      <div className="modal__wrapper">
        <div onClick={onClickExit} className="modal__overlay"></div>
        <div className="modal__content">
          <p className="title title--h4">Спасибо за покупку</p>
          <svg
            className="modal__icon"
            width="80"
            height="78"
            aria-hidden="true"
          >
            <use xlinkHref="#icon-review-success"></use>
          </svg>
          <div className="modal__buttons">
            <button
              onClick={onClickBackToShop}
              id="back-to-shop"
              className="btn btn--purple modal__btn modal__btn--fit-width"
            >
              Вернуться к покупкам
            </button>
          </div>
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={onClickExit}
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

export default ModalThanksBuy;
