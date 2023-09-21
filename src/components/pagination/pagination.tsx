import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { useSearchParams } from 'react-router-dom';
import { getAllItems } from '../../store/items-slice/items-selectors';
import { MAX_ELEMS_ON_ONE_PAGE } from '../../constants/common';
import { checkUrlParams, chunkArray } from '../../utils/pagination';
import { onClickPagination } from '../../store/items-slice/items-slice';
import s from './pagination.module.scss';

const Pagination: React.FC = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(getAllItems);
  const [params, setParams] = useSearchParams();

  const maxPageCount = useMemo(
    () => Math.ceil(items.length / MAX_ELEMS_ON_ONE_PAGE),
    [items.length]
  );

  const allPaggPages = useMemo(
    () =>
      chunkArray(
        Array(maxPageCount)
          .fill(null)
          .map((_, i) => i + 1),
        3
      ),
    [maxPageCount]
  );

  const urlValue = params.get('page');

  useEffect(() => {
    if (checkUrlParams(urlValue, maxPageCount)) {
      setParams({ page: '1' });
    }
  }, [allPaggPages, maxPageCount, params, setParams, urlValue]);

  const [selectedCurrentPageUrl, setSelectedCurrentPageUrl] = useState(() => {
    if (checkUrlParams(urlValue, maxPageCount)) {
      return 0;
    } else {
      return allPaggPages.findIndex((el) => el.includes(Number(urlValue)));
    }
  });

  const onClickNumberPagination = useCallback(
    (value: number) => () => {
      setParams({ page: value.toString() });
      dispatch(onClickPagination(value));
    },
    [dispatch, setParams]
  );

  if (items.length <= 9) {
    return null;
  }

  const onClickPrev = () => {
    setParams({
      page: allPaggPages[selectedCurrentPageUrl - 1][
        allPaggPages[selectedCurrentPageUrl - 1].length - 1
      ].toString(),
    });
    setSelectedCurrentPageUrl((prev) => prev - 1);
    dispatch(onClickPagination(Number(urlValue) - 1));
  };

  const onClickNext = () => {
    setParams({ page: allPaggPages[selectedCurrentPageUrl + 1][0].toString() });
    setSelectedCurrentPageUrl((prev) => prev + 1);
    dispatch(onClickPagination(Number(urlValue) + 1));
  };

  const isFirstPage = !(selectedCurrentPageUrl === 0);
  const isLastPage = !(selectedCurrentPageUrl === allPaggPages.length - 1);

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
