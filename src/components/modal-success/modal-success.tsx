import React, { useEffect } from 'react';

interface IModalSuccessProps {
  setIsShowModalSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalSuccess: React.FC<IModalSuccessProps> = ({
  setIsShowModalSuccess,
}) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const onClickButtonBackToShop = () => {
    setIsShowModalSuccess(false);
  };

  return (
    <div className="modal is-active modal--narrow">
      <div className="modal__wrapper">
        <div onClick={onClickButtonBackToShop} className="modal__overlay"></div>
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
              autoFocus
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
