import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import {
  getSale,
  isErrorSale,
} from '../../store/basket-slice/basket-selectors';
import { fetchCoupon } from '../../store/basket-slice/async-basket';
import { resetError } from '../../store/basket-slice/basket-slice';
import { TIMER_RESET_ERROR } from '../../constants/basket';
import { toast } from 'react-toastify';
import s from './coupon-form.module.scss';

interface ICouponFormProps {
  valueInput: string;
  setValueInput: React.Dispatch<React.SetStateAction<string>>;
}

const CouponForm: React.FC<ICouponFormProps> = ({
  valueInput,
  setValueInput,
}) => {
  const dispatch = useAppDispatch();
  const sale = useAppSelector(getSale);
  const isErrorCoupon = useAppSelector(isErrorSale);

  const onChangeInputSale = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setValueInput(evt.target.value.replace(/\s/gi, ''));
  };

  const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!valueInput) {
      toast.warn('Поле купона не должно быть пустым');
      return;
    }
    dispatch(fetchCoupon(valueInput.toString()));

    setTimeout(() => {
      dispatch(resetError());
    }, TIMER_RESET_ERROR);
  };

  return (
    <form onSubmit={onSubmit} action="#">
      <div className="custom-input">
        <label>
          <span className="custom-input__label">Промокод</span>
          <input
            className={`${isErrorCoupon ? s['error-status'] : ''} ${
              sale ? s['valid-status'] : ''
            }`}
            type="text"
            name="promo"
            placeholder="Введите промокод"
            onChange={onChangeInputSale}
            value={valueInput}
          />
        </label>
        {isErrorCoupon && (
          <p style={{ opacity: '1' }} className="custom-input__error">
            Промокод неверный
          </p>
        )}

        {sale && (
          <p style={{ opacity: '1' }} className="custom-input__success">
            Промокод принят!
          </p>
        )}
      </div>
      <button className="btn" type="submit">
        Применить
      </button>
    </form>
  );
};

export default CouponForm;
