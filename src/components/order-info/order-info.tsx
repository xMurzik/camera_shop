import React, { useMemo } from 'react';
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

const OrderInfo: React.FC = () => {
  const dispatch = useAppDispatch();
  const itemsBasket = useAppSelector(getItemsFromBasket);
  const sale = useAppSelector(getSale);

  const sumPrice = useMemo(
    () => itemsBasket.reduce((acc, el) => acc + el.count * el.price, 0),
    [itemsBasket]
  );

  const priceWithSale = sale ? (sumPrice / 100) * sale.value : 0;

  const formatPriceColor = useMemo(() => {
    if (sale) {
      if (!itemsBasket.length) {
        return '#333';
      }
      return '#ed6041';
    }
    return '#333';
  }, [itemsBasket.length, sale]);

  const onClickHandlerMakeOrder = () => {
    dispatch(makeOrder(itemsBasket))
      .unwrap()
      .then(() => {
        dispatch(resetBasket());
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
          <CouponForm />
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
