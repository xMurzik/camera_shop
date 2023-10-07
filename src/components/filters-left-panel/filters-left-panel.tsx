import React, { useRef } from 'react';
import CategoryBlock from '../category-block/category-block';
import TypeCamerasBlock from '../type-cameras-block/type-cameras-block';
import LevelBlock from '../level-block/level-block';
import PriceBlock from '../price-block/price-block';
import { useSearchParams } from 'react-router-dom';
import { FilterParam, Param } from '../../constants/sort-filters';

const FiltersLeftPanel: React.FC = () => {
  const [params, setParams] = useSearchParams();

  const minValueInput = useRef<HTMLInputElement | null>(null);
  const maxValueInput = useRef<HTMLInputElement | null>(null);

  const onClickButton = () => {
    if (minValueInput.current && maxValueInput.current) {
      minValueInput.current.value = '';
      maxValueInput.current.value = '';
    }

    const form = document.querySelector('.catalog-filter');

    const allInputs = form?.querySelectorAll('input');

    allInputs?.forEach((el) => {
      el.checked = false;
    });

    params.delete(FilterParam.Category);
    params.delete(FilterParam.Type);
    params.delete(FilterParam.Level);
    params.delete(FilterParam.PriceMax);
    params.delete(FilterParam.PriceMin);
    params.delete(Param.SortCountVal);
    params.delete(Param.SortType);
    setParams(params);
  };
  return (
    <div className="catalog__aside">
      <div className="catalog-filter">
        <h2 className="visually-hidden">Фильтр</h2>
        <PriceBlock
          minValueInput={minValueInput}
          maxValueInput={maxValueInput}
        />
        <CategoryBlock />
        <TypeCamerasBlock />
        <LevelBlock />
        <button
          onClick={onClickButton}
          className="btn catalog-filter__reset-btn"
          type="reset"
        >
          Сбросить фильтры
        </button>
      </div>
    </div>
  );
};
export default FiltersLeftPanel;
