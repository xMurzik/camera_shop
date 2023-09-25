import { useMemo, useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { checkUrlParams, chunkArray } from '../utils/pagination';
import { useAppDispatch } from './redux-hooks';
import { onClickPagination } from '../store/items-slice/items-slice';
import { IItem } from '../types/items';

interface IUsePaginationParams {
  items: Array<IItem>;
  maxElems: number;
}

const usePagination = ({ items, maxElems }: IUsePaginationParams) => {
  const dispatch = useAppDispatch();
  const [params, setParams] = useSearchParams();

  const maxPageCount = useMemo(
    () => Math.ceil(items.length / maxElems),
    [items.length, maxElems]
  );

  const allPaggPages = useMemo(
    () =>
      chunkArray(
        Array(maxPageCount)
          .fill(null)
          .map((_, i) => i + 1),
        3
      ) as number[][],
    [maxPageCount]
  );

  const urlValue = params.get('page');

  const [selectedCurrentPageUrl, setSelectedCurrentPageUrl] = useState(() => {
    if (checkUrlParams(urlValue, maxPageCount)) {
      return 0;
    } else {
      return allPaggPages.findIndex((el) => el.includes(Number(urlValue)));
    }
  });

  useEffect(() => {
    if (checkUrlParams(urlValue, maxPageCount)) {
      setParams({ page: '1' });
      setSelectedCurrentPageUrl(0);
      dispatch(onClickPagination(0));
    }
  }, [allPaggPages, dispatch, maxPageCount, params, setParams, urlValue]);

  const onClickNumberPagination = useCallback(
    (value: number) => () => {
      setParams({ page: value.toString() });
      dispatch(onClickPagination(value));
    },
    [dispatch, setParams]
  );

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

  return {
    urlValue,
    allPaggPages,
    onClickNext,
    onClickPrev,
    onClickNumberPagination,
    isFirstPage,
    isLastPage,
    selectedCurrentPageUrl,
  };
};

export default usePagination;
