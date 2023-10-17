import React, { useMemo } from 'react';
import { useAppSelector } from '../../hooks/redux-hooks';
import { getItemsFromBasket } from '../../store/basket-slice/basket-selectors';
import { formatPrice } from '../../utils/format';
import CouponForm from '../coupon-form/coupon-form';

const OrderInfo: React.FC = () => {
  const itemsBasket = useAppSelector(getItemsFromBasket);

  const sumPrice = useMemo(
    () => itemsBasket.reduce((acc, el) => acc + el.count * el.price, 0),
    [itemsBasket]
  );

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
          <span className="basket__summary-value basket__summary-value--bonus">
            0 ₽
          </span>
        </p>
        <p className="basket__summary-item">
          <span className="basket__summary-text basket__summary-text--total">
            К оплате:
          </span>
          <span className="basket__summary-value basket__summary-value--total">
            111 390 ₽
          </span>
        </p>
        <button className="btn btn--purple" type="submit">
          Оформить заказ
        </button>
      </div>
    </div>
  );
};

export default OrderInfo;
