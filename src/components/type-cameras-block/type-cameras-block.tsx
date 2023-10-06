import React, { useRef, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  CameraCategory,
  FilterParam,
  TypeValue,
} from '../../constants/sort-filters';
import { isCheckedTypeFilter } from '../../utils/params';

const TypeCamerasBlock: React.FC = () => {
  const [params, setParams] = useSearchParams();
  const refPlenochnaya = useRef<HTMLInputElement | null>(null);
  const refMomentalnaya = useRef<HTMLInputElement | null>(null);

  const filterTypeParamsArray = useCallback(() => {
    const paramType = params.get(FilterParam.Type);

    if (paramType) {
      const value = JSON.parse(paramType) as Array<string>;

      if (!value.length) {
        return false;
      }

      const isBroken = value.filter(
        (el) =>
          el === TypeValue.Collection ||
          el === TypeValue.Digital ||
          el === TypeValue.Film ||
          el === TypeValue.Snapshot
      );

      return JSON.stringify(isBroken);
    }

    return false;
  }, [params]);

  useEffect(() => {
    const paramType = params.get(FilterParam.Type);

    if (paramType) {
      const value = filterTypeParamsArray();
      if (value) {
        setParams((prevParams) => {
          prevParams.set(FilterParam.Type, value);
          return prevParams;
        });
      }
    }

    if (params.get(FilterParam.Category) === CameraCategory.Videocamera) {
      if (refPlenochnaya.current) {
        refPlenochnaya.current.checked = false;
      }
      if (refMomentalnaya.current) {
        refMomentalnaya.current.checked = false;
      }

      if (paramType) {
        const value = JSON.parse(paramType) as Array<string>;
        if (value.includes(TypeValue.Snapshot || TypeValue.Film)) {
          const newVal = value.filter(
            (el) => el !== TypeValue.Snapshot && el !== TypeValue.Film
          );

          setParams((prevParams) => {
            prevParams.set(FilterParam.Type, JSON.stringify(newVal));
            return prevParams;
          });
        }
      }
    }
  }, [filterTypeParamsArray, params, setParams]);

  const onChangeType = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      const paramType = params.get(FilterParam.Type);

      if (!paramType) {
        const types = [evt.target.name];
        params.set(FilterParam.Type, JSON.stringify(types));
        setParams(params);
        return;
      }

      if (paramType) {
        const prevVal: Array<string> = JSON.parse(paramType) as Array<string>;

        if (prevVal.includes(evt.target.name)) {
          const newVal = prevVal.filter((el) => el !== evt.target.name);
          params.set(FilterParam.Type, JSON.stringify(newVal));
          setParams(params);
          return;
        }

        if (!prevVal.includes(evt.target.name)) {
          prevVal.push(evt.target.name);
          params.set(FilterParam.Type, JSON.stringify(prevVal));
          setParams(params);
        }
      }
    },
    [params, setParams]
  );

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Тип камеры</legend>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input
            onChange={onChangeType}
            type="checkbox"
            name="Цифровая"
            defaultChecked={isCheckedTypeFilter(TypeValue.Digital)}
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
            defaultChecked={isCheckedTypeFilter(TypeValue.Film)}
            disabled={
              params.get(FilterParam.Category) === CameraCategory.Videocamera
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
            defaultChecked={isCheckedTypeFilter(TypeValue.Snapshot)}
            disabled={
              params.get(FilterParam.Category) === CameraCategory.Videocamera
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
            defaultChecked={isCheckedTypeFilter(TypeValue.Collection)}
          />
          <span className="custom-checkbox__icon" />
          <span className="custom-checkbox__label">Коллекционная</span>
        </label>
      </div>
    </fieldset>
  );
};

export default TypeCamerasBlock;
