import React from 'react';
import usePagination from '../../hooks/usePagination';
import { useAppSelector } from '../../hooks/redux-hooks';
import { getAllItems } from '../../store/items-slice/items-selectors';
import { MAX_ELEMS_ON_ONE_PAGE } from '../../constants/common';
import s from './pagination.module.scss';

const Pagination: React.FC = () => {
  const items = useAppSelector(getAllItems);
  const {
    urlValue,
    allPaggPages,
    selectedCurrentPageUrl,
    isFirstPage,
    isLastPage,
    onClickNext,
    onClickNumberPagination,
    onClickPrev,
  } = usePagination({ items, maxElems: MAX_ELEMS_ON_ONE_PAGE });

  if (items.length <= 9) {
    return null;
  }

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {isFirstPage && (
          <li className="pagination__item">
            <button
              onClick={onClickPrev}
              className={`${s.buttonPaggination} pagination__link pagination__link--text`}
            >
              Назад
            </button>
          </li>
        )}
        {allPaggPages[selectedCurrentPageUrl].map((el) => (
          <li key={el} className="pagination__item">
            <button
              className={`${s.buttonPaggination} pagination__link ${
                el === Number(urlValue) ? 'pagination__link--active' : ''
              }`}
              onClick={onClickNumberPagination(el)}
            >
              {el}
            </button>
          </li>
        ))}

        {isLastPage && (
          <li className="pagination__item">
            <button
              onClick={onClickNext}
              className={`${s.buttonPaggination} pagination__link pagination__link--text`}
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
