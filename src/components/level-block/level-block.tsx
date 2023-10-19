import React, { useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FilterParam, LevelValue, Param } from '../../constants/sort-filters';
import { isCheckedLevelFilter } from '../../utils/params';

const LevelBlock: React.FC = () => {
  const [params, setParams] = useSearchParams();

  const filterTypeParamsArray = useCallback(() => {
    const paramType = params.get(FilterParam.Level);

    if (paramType) {
      const value = JSON.parse(paramType) as Array<string>;

      if (!value.length) {
        return false;
      }

      const isBroken = value.filter(
        (el) =>
          el === LevelValue.NonProf ||
          el === LevelValue.Pro ||
          el === LevelValue.zero
      );

      return JSON.stringify(isBroken);
    }

    return false;
  }, [params]);

  useEffect(() => {
    const paramType = params.get(FilterParam.Level);

    if (paramType) {
      const value = filterTypeParamsArray();
      if (value) {
        setParams((prevParams) => {
          prevParams.set(FilterParam.Level, value);
          return prevParams;
        });
      }
    }
  }, [filterTypeParamsArray, params, setParams]);

  const onChangeLevel = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      const paramType = params.get(FilterParam.Level);
      params.set(Param.Page, '1');

      if (!paramType) {
        const types = [evt.target.name];
        params.set(FilterParam.Level, JSON.stringify(types));
        setParams(params);
        return;
      } else {
        const prevVal: Array<string> = JSON.parse(paramType) as Array<string>;

        if (prevVal.includes(evt.target.name)) {
          const newVal = prevVal.filter((el) => el !== evt.target.name);
          params.set(FilterParam.Level, JSON.stringify(newVal));
          setParams(params);
          return;
        }

        if (!prevVal.includes(evt.target.name)) {
          prevVal.push(evt.target.name);
          params.set(FilterParam.Level, JSON.stringify(prevVal));
          setParams(params);
          return;
        }
      }

      setParams(params);
    },
    [params, setParams]
  );

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Уровень</legend>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input
            checked={isCheckedLevelFilter(LevelValue.zero)}
            onChange={onChangeLevel}
            type="checkbox"
            name="Нулевой"
          />
          <span className="custom-checkbox__icon" />
          <span className="custom-checkbox__label">Нулевой</span>
        </label>
      </div>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input
            checked={isCheckedLevelFilter(LevelValue.NonProf)}
            onChange={onChangeLevel}
            type="checkbox"
            name="Любительский"
          />
          <span className="custom-checkbox__icon" />
          <span className="custom-checkbox__label">Любительский</span>
        </label>
      </div>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input
            checked={isCheckedLevelFilter(LevelValue.Pro)}
            onChange={onChangeLevel}
            type="checkbox"
            name="Профессиональный"
          />
          <span className="custom-checkbox__icon" />
          <span className="custom-checkbox__label">Профессиональный</span>
        </label>
      </div>
    </fieldset>
  );
};

export default LevelBlock;
