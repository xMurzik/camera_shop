import React, { useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import {
  getItemsFromBasket,
  getSale,
} from '../../store/basket-slice/basket-selectors';
import { formatPrice } from '../../utils/format';
import CouponForm from '../coupon-form/coupon-form';
import { makeOrder } from '../../store/basket-slice/async-basket';
import { toast } from 'react-toastify';
import { onClickMakeOrder } from '../../store/modal-slice/modal-slice';
import { resetBasket } from '../../store/basket-slice/basket-slice';

const ONE_HUNDRED = 100;
const ZERO = 0;
const RED = '#ed6041';
const BLACK = '#333';

const OrderInfo: React.FC = () => {
  const dispatch = useAppDispatch();
  const itemsBasket = useAppSelector(getItemsFromBasket);
  const sale = useAppSelector(getSale);

  const [valueInput, setValueInput] = useState(sale ? sale.name : '');

  const sumPrice = useMemo(
    () => itemsBasket.reduce((acc, el) => acc + el.count * el.price, ZERO),
    [itemsBasket]
  );

  const priceWithSale = sale ? (sumPrice / ONE_HUNDRED) * sale.value : ZERO;

  const formatPriceColor = useMemo(
    () => (sale && itemsBasket.length ? RED : BLACK),
    [itemsBasket.length, sale]
  );

  const onClickHandlerMakeOrder = () => {
    dispatch(makeOrder(itemsBasket))
      .unwrap()
      .then(() => {
        dispatch(resetBasket());
        setValueInput('');
        dispatch(onClickMakeOrder());
      })
      .catch(() => {
        toast.warn('Ошибка оформления заказа');
      });
  };

  return (
    <div className="basket__summary">
      <div className="basket__promo">
        <p className="title title--h4">
          Если у вас есть промокод на скидку, примените его в этом поле
        </p>
        <div className="basket-form">
          <CouponForm valueInput={valueInput} setValueInput={setValueInput} />
        </div>
      </div>
      <div className="basket__summary-order">
        <p className="basket__summary-item">
          <span className="basket__summary-text">Всего:</span>
          <span className="basket__summary-value">
            {formatPrice(sumPrice)} ₽
          </span>
        </p>
        <p className="basket__summary-item">
          <span className="basket__summary-text">Скидка:</span>
          <span
            style={{ color: formatPriceColor }}
            className="basket__summary-value basket__summary-value--bonus"
          >
            {formatPrice(Math.round(priceWithSale))} ₽
          </span>
        </p>
        <p className="basket__summary-item">
          <span className="basket__summary-text basket__summary-text--total">
            К оплате:
          </span>
          <span className="basket__summary-value basket__summary-value--total">
            {formatPrice(sumPrice - Math.round(priceWithSale))} ₽
          </span>
        </p>
        <button
          disabled={!itemsBasket.length}
          className="btn btn--purple"
          type="submit"
          onClick={onClickHandlerMakeOrder}
        >
          Оформить заказ
        </button>
      </div>
    </div>
  );
};

export default OrderInfo;
