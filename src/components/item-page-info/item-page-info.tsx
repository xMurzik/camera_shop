import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { fetchItem } from '../../store/item-slice/async-item';
import { Path } from '../../constants/common';
import RatingStatic from '../../components/rating-static/rating-static';
import classNames from 'classnames';
import { getDataItem } from '../../store/item-slice/item-selectorts';

const enum InfoItem {
  description = 'description',
  characteristics = 'characteristics',
}

const ItemPageInfo: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  const dataItem = useAppSelector(getDataItem);

  const dispatch = useAppDispatch();

  const [statusDescription, setStatusDescription] = useState<InfoItem>(
    InfoItem.description
  );

  const onClickCharacteristics = () =>
    setStatusDescription(InfoItem.characteristics);

  const onClickDescription = () => setStatusDescription(InfoItem.description);

  useEffect(() => {
    if (id) {
      dispatch(fetchItem(Number(id)))
        .unwrap()
        .catch(() => {
          navigate(Path.catalog);
        })
        .finally(() => setIsLoading(false));
    }
  }, [dispatch, id, navigate, setIsLoading]);

  if (!dataItem || isLoading) {
    return null;
  }

  return (
    <>
      <div className="breadcrumbs">
        <div className="container">
          <ul className="breadcrumbs__list">
            <li className="breadcrumbs__item">
              <Link className="breadcrumbs__link" to={Path.catalog}>
                Главная
                <svg width={5} height={8} aria-hidden="true">
                  <use xlinkHref="#icon-arrow-mini" />
                </svg>
              </Link>
            </li>
            <li className="breadcrumbs__item">
              <Link className="breadcrumbs__link" to={Path.catalog}>
                Каталог
                <svg width={5} height={8} aria-hidden="true">
                  <use xlinkHref="#icon-arrow-mini" />
                </svg>
              </Link>
            </li>
            <li className="breadcrumbs__item">
              <span className="breadcrumbs__link breadcrumbs__link--active">
                {dataItem.name}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="page-content__section">
        <section className="product">
          <div className="container">
            <div className="product__img">
              <picture>
                <source
                  type="image/webp"
                  srcSet={`${dataItem.previewImgWebp}, ${dataItem.previewImgWebp2x} 2x`}
                />
                <img
                  src={dataItem.previewImg}
                  srcSet={`${dataItem.previewImg2x} 2x`}
                  width={560}
                  height={480}
                  alt={dataItem.name}
                />
              </picture>
            </div>
            <div className="product__content">
              <h1 className="title title--h3">{dataItem.name}</h1>
              <div className="rate product__rate">
                <RatingStatic rating={dataItem.rating} />
                <p className="visually-hidden">Рейтинг: {dataItem.rating}</p>
                <p className="rate__count">
                  <span className="visually-hidden">Всего оценок:</span>
                  {dataItem.reviewCount}
                </p>
              </div>
              <p className="product__price">
                <span className="visually-hidden">Цена:</span>
                {dataItem.price} ₽
              </p>
              <button className="btn btn--purple" type="button">
                <svg width={24} height={16} aria-hidden="true">
                  <use xlinkHref="#icon-add-basket" />
                </svg>
                Добавить в корзину
              </button>
              <div className="tabs product__tabs">
                <div className="tabs__controls product__tabs-controls">
                  <button
                    className={classNames('tabs__control', {
                      'is-active':
                        statusDescription === InfoItem.characteristics,
                    })}
                    type="button"
                    onClick={onClickCharacteristics}
                  >
                    Характеристики
                  </button>
                  <button
                    className={classNames('tabs__control', {
                      'is-active': statusDescription === InfoItem.description,
                    })}
                    type="button"
                    onClick={onClickDescription}
                  >
                    Описание
                  </button>
                </div>
                <div className="tabs__content">
                  <div
                    className={classNames('tabs__element', {
                      'is-active':
                        statusDescription === InfoItem.characteristics,
                    })}
                  >
                    <ul className="product__tabs-list">
                      <li className="item-list">
                        <span className="item-list__title">Артикул:</span>
                        <p className="item-list__text">{dataItem.vendorCode}</p>
                      </li>
                      <li className="item-list">
                        <span className="item-list__title">Категория:</span>
                        <p className="item-list__text">{dataItem.category}</p>
                      </li>
                      <li className="item-list">
                        <span className="item-list__title">Тип камеры:</span>
                        <p className="item-list__text">{dataItem.type}</p>
                      </li>
                      <li className="item-list">
                        <span className="item-list__title">Уровень:</span>
                        <p className="item-list__text">{dataItem.level}</p>
                      </li>
                    </ul>
                  </div>
                  <div
                    className={classNames('tabs__element', {
                      'is-active': statusDescription === InfoItem.description,
                    })}
                  >
                    <div className="product__tabs-text">
                      <p>{dataItem.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ItemPageInfo;
