import React from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  CameraCategory,
  FilterParam,
  Param,
  TypeValue,
} from '../../constants/sort-filters';

const CategoryBlock: React.FC = () => {
  const [params, setParams] = useSearchParams();

  const onChangeCategory = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (params.get(FilterParam.Category) === evt.target.name) {
      return;
    }

    params.set(FilterParam.Category, evt.target.name);
    params.set(Param.Page, '1');
    if (evt.target.name === CameraCategory.Videocamera) {
      const paramType = params.get(FilterParam.Type);

      if (paramType) {
        const value = JSON.parse(paramType) as Array<string>;

        if (value.length) {
          const newValue = value.filter(
            (el) => el !== TypeValue.Film && el !== TypeValue.Snapshot
          );

          params.set(FilterParam.Type, JSON.stringify(newValue));

          setParams(params);
        }
      }
    }

    setParams(params);
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Категория</legend>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input
            type="checkbox"
            name="Фотоаппарат"
            onChange={onChangeCategory}
            checked={
              params.get(FilterParam.Category) === CameraCategory.Photocamera
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
            name="Видеокамера"
            onChange={onChangeCategory}
            checked={
              params.get(FilterParam.Category) === CameraCategory.Videocamera
            }
          />
          <span className="custom-checkbox__icon" />
          <span className="custom-checkbox__label">Видеокамера</span>
        </label>
      </div>
    </fieldset>
  );
};

export default CategoryBlock;
