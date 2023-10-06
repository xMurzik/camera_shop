import React, { useRef, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  CameraCategory,
  FilterParam,
  TypeValue,
} from '../../constants/sort-filters';
import { isCheckedTypeFilter } from '../../utils/params';

const FiltersLeftPanel: React.FC = () => {
  const [params, setParams] = useSearchParams();

  const refPlenochnaya = useRef<HTMLInputElement | null>(null);
  const refMomentalnaya = useRef<HTMLInputElement | null>(null);

  const filterTypeParamsArray = useCallback(() => {
    const paramType = params.get(FilterParam.type);

    if (paramType) {
      const value = JSON.parse(paramType) as Array<string>;

      if (!value.length) {
        return false;
      }

      const isBroken = value.filter(
        (el) =>
          el === TypeValue.collection ||
          el === TypeValue.digital ||
          el === TypeValue.film ||
          el === TypeValue.snapshot
      );

      return JSON.stringify(isBroken);
    }

    return false;
  }, [params]);

  useEffect(() => {
    const paramType = params.get(FilterParam.type);

    if (paramType) {
      const value = filterTypeParamsArray();
      if (value) {
        setParams((prevParams) => {
          prevParams.set(FilterParam.type, value);
          return prevParams;
        });
      }
    }

    if (params.get(FilterParam.category) === CameraCategory.videocamera) {
      if (refPlenochnaya.current) {
        refPlenochnaya.current.checked = false;
      }
      if (refMomentalnaya.current) {
        refMomentalnaya.current.checked = false;
      }

      if (paramType) {
        const value = JSON.parse(paramType) as Array<string>;
        if (value.includes(TypeValue.snapshot || TypeValue.film)) {
          const newVal = value.filter(
            (el) => el !== TypeValue.snapshot && el !== TypeValue.film
          );

          setParams((prevParams) => {
            prevParams.set(FilterParam.type, JSON.stringify(newVal));
            return prevParams;
          });
        }
      }
    }
  }, [filterTypeParamsArray, params, setParams]);

  const onChangeCategory = (evt: React.ChangeEvent<HTMLInputElement>) => {
    params.set(FilterParam.category, evt.target.name);

    if (evt.target.name === CameraCategory.videocamera) {
      const paramType = params.get(FilterParam.type);

      if (paramType) {
        const value = JSON.parse(paramType) as Array<string>;

        if (value.length) {
          const newValue = value.filter(
            (el) => el !== TypeValue.film && el !== TypeValue.snapshot
          );

          params.set(FilterParam.type, JSON.stringify(newValue));

          setParams(params);
        }
      }
    }

    setParams(params);
  };

  const onChangeType = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const paramType = params.get(FilterParam.type);

    if (!paramType) {
      const types = [evt.target.name];
      params.set(FilterParam.type, JSON.stringify(types));
      setParams(params);
      return;
    }

    if (paramType) {
      const prevVal: Array<string> = JSON.parse(paramType) as Array<string>;

      if (prevVal.includes(evt.target.name)) {
        const newVal = prevVal.filter((el) => el !== evt.target.name);
        params.set(FilterParam.type, JSON.stringify(newVal));
        setParams(params);
        return;
      }

      if (!prevVal.includes(evt.target.name)) {
        prevVal.push(evt.target.name);
        params.set(FilterParam.type, JSON.stringify(prevVal));
        setParams(params);
      }
    }
  };

  return (
    <div className="catalog__aside">
      <div className="catalog-filter">
        <form action="#">
          <h2 className="visually-hidden">Фильтр</h2>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Цена, ₽</legend>
            <div className="catalog-filter__price-range">
              <div className="custom-input">
                <label>
                  <input type="number" name="price" placeholder="от" />
                </label>
              </div>
              <div className="custom-input">
                <label>
                  <input type="number" name="priceUp" placeholder="до" />
                </label>
              </div>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Категория</legend>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name="photocamera"
                  onChange={onChangeCategory}
                  checked={
                    params.get(FilterParam.category) ===
                    CameraCategory.photocamera
                  }
                />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">Фотокамера</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name="videocamera"
                  onChange={onChangeCategory}
                  checked={
                    params.get(FilterParam.category) ===
                    CameraCategory.videocamera
                  }
                />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">Видеокамера</span>
              </label>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Тип камеры</legend>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  onChange={onChangeType}
                  type="checkbox"
                  name="Цифровая"
                  defaultChecked={isCheckedTypeFilter(TypeValue.digital)}
                />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">Цифровая</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  onChange={onChangeType}
                  ref={refPlenochnaya}
                  defaultChecked={isCheckedTypeFilter(TypeValue.film)}
                  disabled={
                    params.get(FilterParam.category) ===
                    CameraCategory.videocamera
                  }
                  type="checkbox"
                  name="Плёночная"
                />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">Плёночная</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  onChange={onChangeType}
                  ref={refMomentalnaya}
                  defaultChecked={isCheckedTypeFilter(TypeValue.snapshot)}
                  disabled={
                    params.get(FilterParam.category) ===
                    CameraCategory.videocamera
                  }
                  type="checkbox"
                  name="Моментальная"
                />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">Моментальная</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  onChange={onChangeType}
                  type="checkbox"
                  name="Коллекционная"
                  defaultChecked={isCheckedTypeFilter(TypeValue.collection)}
                />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">Коллекционная</span>
              </label>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Уровень</legend>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="zero" />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">Нулевой</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="non-professional" />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">Любительский</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="professional" />
                <span className="custom-checkbox__icon" />
                <span className="custom-checkbox__label">Профессиональный</span>
              </label>
            </div>
          </fieldset>
          <button className="btn catalog-filter__reset-btn" type="reset">
            Сбросить фильтры
          </button>
        </form>
      </div>
    </div>
  );
};

export default FiltersLeftPanel;
