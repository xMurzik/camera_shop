import { useMemo, useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { checkUrlParams, chunkArray } from '../utils/pagination';
import { useAppDispatch } from './redux-hooks';
import { IItem } from '../types/items';

interface IUsePaginationParams {
  items: Array<IItem>;
  maxElems: number;
}

const THREE = 3;
const ONE = 1;
const ZERO = 0;

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
          .map((_, i) => i + ONE),
        THREE
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
      params.set('page', '1');
      setParams(params);
      setSelectedCurrentPageUrl(ZERO);
    } else {
      setSelectedCurrentPageUrl(() =>
        allPaggPages.findIndex((el) => el.includes(Number(urlValue)))
      );
    }
  }, [allPaggPages, dispatch, maxPageCount, params, setParams, urlValue]);

  const onClickPrev = useCallback(() => {
    const newPage = Number(urlValue) - ONE;
    params.set('page', newPage.toString());
    setParams(params);
  }, [params, setParams, urlValue]);

  const onClickNext = useCallback(() => {
    const newPage = Number(urlValue) + ONE;
    params.set('page', newPage.toString());
    setParams(params);
  }, [params, setParams, urlValue]);

  const onClickNumber = useCallback(
    (page: number) => () => {
      params.set('page', page.toString());
      setParams(params);
    },
    [params, setParams]
  );

  const isFirstPage = !(selectedCurrentPageUrl === ZERO);
  const isLastPage = !(selectedCurrentPageUrl === allPaggPages.length - ONE);

  return {
    onClickNumber,
    onClickPrev,
    onClickNext,
    urlValue,
    pageToRender: allPaggPages[selectedCurrentPageUrl],
    isFirstPage,
    isLastPage,
  };
};

export default usePagination;
