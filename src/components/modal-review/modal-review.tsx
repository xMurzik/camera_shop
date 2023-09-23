import React, { useEffect } from 'react';
import RateBar from '../rate-bar/rate-bar';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IReviewComment } from '../../types/review';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { fetchPostComment } from '../../store/item-slice/async-item';
import { useParams } from 'react-router-dom';
import { IComment } from '../../types/comments';

interface IModalReviewProps {
  isActive: boolean;
  setIsShowModalOverlay: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowModalSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalReview: React.FC<IModalReviewProps> = ({
  isActive,
  setIsShowModalOverlay,
  setIsShowModalSuccess,
}) => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

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

  useEffect(() => {
    setFocus('name');
  }, [setFocus]);

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
          setTimeout(() => {
            document.getElementById('button-back-to-shop')?.focus();
          }, 500);
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
    setTimeout(() => reset(), 500);
  };

  return (
    <div className={`modal ${isActive ? 'is-active' : ''}`}>
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
                        pattern: /[a-z0-9а-я]{5,}/gi,
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
                      style={{
                        border: errors.advantage ? '2px solid red' : '',
                      }}
                      placeholder="Основные преимущества товара"
                      {...register('advantage', {
                        required: true,
                        pattern: /[a-z0-9а-я]{10,140}/gi,
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
                        pattern: /[a-z0-9а-я]{10,140}/gi,
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
                        pattern: /[a-z0-9а-я]{5,140}/gi,
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
