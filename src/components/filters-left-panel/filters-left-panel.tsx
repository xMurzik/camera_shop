import React from 'react';
import CategoryBlock from '../category-block/category-block';
import TypeCamerasBlock from '../type-cameras-block/type-cameras-block';
import LevelBlock from '../level-block/level-block';
import PriceBlock from '../price-block/price-block';

const FiltersLeftPanel: React.FC = () => (
  <div className="catalog__aside">
    <div className="catalog-filter">
      <form action="#">
        <h2 className="visually-hidden">Фильтр</h2>
        <PriceBlock />
        <CategoryBlock />
        <TypeCamerasBlock />
        <LevelBlock />
        <button className="btn catalog-filter__reset-btn" type="reset">
          Сбросить фильтры
        </button>
      </form>
    </div>
  </div>
);
export default FiltersLeftPanel;
