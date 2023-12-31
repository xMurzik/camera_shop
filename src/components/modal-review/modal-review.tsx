import React, { useEffect } from 'react';
import RateBar from '../rate-bar/rate-bar';
import UseFocusModal from '../../hooks/use-focus-modal';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IReviewComment } from '../../types/review';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { fetchPostComment } from '../../store/item-slice/async-item';
import { useParams } from 'react-router-dom';
import { IComment } from '../../types/comments';
import { TIMEOUT } from '../../constants/common';

interface IModalReviewProps {
  isActive: boolean;
  setIsShowModalOverlay: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowModalSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  refButton: React.MutableRefObject<HTMLButtonElement | null>;
}

const ModalReview: React.FC<IModalReviewProps> = ({
  isActive,
  setIsShowModalOverlay,
  setIsShowModalSuccess,
  refButton,
}) => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const refModalDiv = UseFocusModal();

  const {
    register,
    reset,
    handleSubmit,
    watch,
    setFocus,
    formState: { errors },
  } = useForm<IReviewComment>({
    defaultValues: {
      comment: '',
    },
  });

  const onSubmit: SubmitHandler<IReviewComment> = (data) => {
    if (id) {
      const dataForFetch: Omit<IComment, 'id' | 'createAt'> = {
        cameraId: Number(id),
        userName: data.name,
        advantage: data.advantage,
        disadvantage: data.disadvantage,
        review: data.comment,
        rating: Number(data.rate),
      };

      dispatch(fetchPostComment(dataForFetch))
        .unwrap()
        .then(() => {
          setIsShowModalOverlay(false);
          setIsShowModalSuccess(true);
          reset();
        });
    }
  };

  const onSubmitFormSend = (evt: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(onSubmit)(evt);
  };

  const onClickModalOverlay = () => {
    setIsShowModalOverlay(false);
    document.body.style.overflow = 'unset';
    setTimeout(() => reset(), TIMEOUT);
  };

  useEffect(() => {
    const onClickNewRev = () => {
      setIsShowModalOverlay(true);

      setTimeout(() => {
        setFocus('name');
      }, TIMEOUT);

      document.body.style.overflow = 'hidden';
    };

    const onClickEsc = (evt: KeyboardEvent) => {
      if (evt.code === 'Escape') {
        setIsShowModalOverlay(false);
        setIsShowModalSuccess(false);

        setTimeout(() => {
          reset();
        }, TIMEOUT);

        document.body.style.overflow = 'unset';
      }
    };

    document.addEventListener('keydown', onClickEsc);

    if (refButton.current) {
      refButton.current.addEventListener('click', onClickNewRev);
    }

    const current = refButton.current;

    return () => {
      document.removeEventListener('keydown', onClickEsc);

      if (current) {
        current.removeEventListener('click', onClickNewRev);
      }
    };
  }, [
    refButton,
    reset,
    setFocus,
    setIsShowModalOverlay,
    setIsShowModalSuccess,
  ]);

  return (
    <div ref={refModalDiv} className={`modal ${isActive ? 'is-active' : ''}`}>
      <div className="modal__wrapper">
        <div onClick={onClickModalOverlay} className="modal__overlay" />
        <div className="modal__content">
          <p className="title title--h4">Оставить отзыв</p>
          <div className="form-review">
            <form id="form_review" onSubmit={onSubmitFormSend} method="post">
              <div className="form-review__rate">
                <fieldset className="rate form-review__item">
                  <legend className="rate__caption">
                    Рейтинг
                    <svg width={9} height={9} aria-hidden="true">
                      <use xlinkHref="#icon-snowflake" />
                    </svg>
                  </legend>
                  <RateBar watch={watch} register={register} />
                  {errors.rate && (
                    <p style={{ opacity: '1' }} className="rate__message">
                      Нужно оценить товар
                    </p>
                  )}
                </fieldset>
                <div className="custom-input form-review__item">
                  <label>
                    <span className="custom-input__label">
                      Ваше имя
                      <svg width={9} height={9} aria-hidden="true">
                        <use xlinkHref="#icon-snowflake" />
                      </svg>
                    </span>

                    <input
                      id="name_input_modal"
                      type="text"
                      placeholder="Введите ваше имя"
                      style={{ border: errors.name ? '2px solid red' : '' }}
                      {...register('name', {
                        required: true,
                        maxLength: 160,
                        pattern: /[a-z0-9а-я]{2,160}/gi,
                      })}
                    />
                  </label>
                  {errors.name && (
                    <p style={{ opacity: '1' }} className="custom-input__error">
                      Нужно указать имя
                    </p>
                  )}
                </div>
                <div className="custom-input form-review__item">
                  <label>
                    <span className="custom-input__label">
                      Достоинства
                      <svg width={9} height={9} aria-hidden="true">
                        <use xlinkHref="#icon-snowflake" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      id="advantage_input"
                      style={{
                        border: errors.advantage ? '2px solid red' : '',
                      }}
                      placeholder="Основные преимущества товара"
                      {...register('advantage', {
                        required: true,
                        maxLength: 160,
                        pattern: /[a-z0-9а-я]{2,160}/gi,
                      })}
                    />
                  </label>
                  {errors.advantage && (
                    <p style={{ opacity: 1 }} className="custom-input__error">
                      Нужно указать достоинства
                    </p>
                  )}
                </div>
                <div className="custom-input form-review__item">
                  <label>
                    <span className="custom-input__label">
                      Недостатки
                      <svg width={9} height={9} aria-hidden="true">
                        <use xlinkHref="#icon-snowflake" />
                      </svg>
                    </span>
                    <input
                      style={{
                        border: errors.disadvantage ? '2px solid red' : '',
                      }}
                      type="text"
                      placeholder="Главные недостатки товара"
                      {...register('disadvantage', {
                        required: true,
                        maxLength: 160,
                        pattern: /[a-z0-9а-я]{2,160}/gi,
                      })}
                    />
                  </label>
                  {errors.disadvantage && (
                    <p style={{ opacity: 1 }} className="custom-input__error">
                      Нужно указать недостатки
                    </p>
                  )}
                </div>
                <div className="custom-textarea form-review__item">
                  <label>
                    <span className="custom-textarea__label">
                      Комментарий
                      <svg width={9} height={9} aria-hidden="true">
                        <use xlinkHref="#icon-snowflake" />
                      </svg>
                    </span>
                    <textarea
                      style={{
                        border: errors.comment ? '2px solid red' : '',
                      }}
                      {...register('comment', {
                        required: true,
                        maxLength: 160,
                        pattern: /[a-z0-9а-я]{2,160}/gi,
                      })}
                      placeholder="Поделитесь своим опытом покупки"
                    />
                  </label>
                  {errors.comment && (
                    <div className="custom-textarea__error">
                      Нужно добавить комментарий
                    </div>
                  )}
                </div>
              </div>
              <button
                className="btn btn--purple form-review__btn"
                type="submit"
              >
                Отправить отзыв
              </button>
            </form>
          </div>
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={onClickModalOverlay}
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

export default ModalReview;
