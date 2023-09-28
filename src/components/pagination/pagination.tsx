import React from 'react';
import usePagination from '../../hooks/use-pagination';
import { useAppSelector } from '../../hooks/redux-hooks';
import { getAllItems } from '../../store/items-slice/items-selectors';
import { MAX_ELEMS_ON_ONE_PAGE, Path } from '../../constants/common';
import s from './pagination.module.scss';
import { Link } from 'react-router-dom';

const Pagination: React.FC = () => {
  const items = useAppSelector(getAllItems);
  const {
    urlValue,
    allPaggPages,
    selectedCurrentPageUrl,
    isFirstPage,
    isLastPage,
    onClickNext,
    onClickPrev,
  } = usePagination({ items, maxElems: MAX_ELEMS_ON_ONE_PAGE });

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
              className={`${s.buttonPaggination} pagination__link pagination__link--text`}
            >
              Назад
            </button>
          </li>
        )}
        {allPaggPages[selectedCurrentPageUrl].map((el) => (
          <li key={el} className="pagination__item">
            <Link
              className={`pagination__link ${
                el === Number(urlValue) ? 'pagination__link--active' : ''
              }`}
              to={`${Path.Catalog}?page=${el}`}
            >
              {el}
            </Link>
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
