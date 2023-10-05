import React from 'react';
import usePagination from '../../hooks/use-pagination';
import { useAppSelector } from '../../hooks/redux-hooks';
import { getAllItems } from '../../store/items-slice/items-selectors';
import { MAX_ELEMS_ON_ONE_PAGE } from '../../constants/common';
import s from './pagintation.module.scss';

const Pagination: React.FC = () => {
  const items = useAppSelector(getAllItems);

  const {
    urlValue,
    pageToRender,
    isFirstPage,
    isLastPage,
    onClickNext,
    onClickPrev,
    onClickNumber,
  } = usePagination({
    items,
    maxElems: MAX_ELEMS_ON_ONE_PAGE,
  });

  if (items.length <= MAX_ELEMS_ON_ONE_PAGE) {
    return null;
  }

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {isFirstPage && (
          <li className="pagination__item">
            <button
              onClick={onClickPrev}
              className={`${s['button-prev-next']} pagination__link pagination__link--text`}
            >
              Назад
            </button>
          </li>
        )}
        {pageToRender.map((el) => (
          <li key={el} className="pagination__item">
            <button
              onClick={onClickNumber(el)}
              className={`pagination__link ${s['button-number-paggination']} ${
                el === Number(urlValue) ? 'pagination__link--active' : ''
              }`}
            >
              {el}
            </button>
          </li>
        ))}
        {isLastPage && (
          <li className="pagination__item">
            <button
              onClick={onClickNext}
              className={`${s['button-prev-next']} pagination__link pagination__link--text`}
            >
              Далее
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Pagination;
