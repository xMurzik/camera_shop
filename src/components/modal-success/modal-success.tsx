import React from 'react';
import UseFocusModal from '../../hooks/use-focus-modal';

interface IModalSuccessProps {
  isActive: boolean;
  setIsShowModalSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalSuccess: React.FC<IModalSuccessProps> = ({
  isActive,
  setIsShowModalSuccess,
}) => {
  const onClickButtonBackToShop = () => {
    document.body.style.overflow = 'unset';
    setIsShowModalSuccess(false);
  };

  const refModalDiv = UseFocusModal();

  return (
    <div
      ref={refModalDiv}
      data-testid="modal-success"
      className={`modal ${isActive ? 'is-active' : ''} modal--narrow`}
    >
      <div className="modal__wrapper">
        <div onClick={onClickButtonBackToShop} className="modal__overlay" />
        <div className="modal__content">
          <p className="title title--h4">Спасибо за отзыв</p>
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
              onClick={onClickButtonBackToShop}
              className="btn btn--purple modal__btn modal__btn--fit-width"
              type="button"
              id="button-back-to-shop"
            >
              Вернуться к покупкам
            </button>
          </div>
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={onClickButtonBackToShop}
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

export default ModalSuccess;
