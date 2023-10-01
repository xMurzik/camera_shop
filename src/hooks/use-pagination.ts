import { useMemo, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { checkUrlParams, chunkArray } from '../utils/pagination';
import { useAppDispatch } from './redux-hooks';
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
    } else {
      setSelectedCurrentPageUrl(() =>
        allPaggPages.findIndex((el) => el.includes(Number(urlValue)))
      );
    }
  }, [allPaggPages, dispatch, maxPageCount, setParams, urlValue]);

  const isFirstPage = !(selectedCurrentPageUrl === 0);
  const isLastPage = !(selectedCurrentPageUrl === allPaggPages.length - 1);

  return {
    urlValue,
    pageToRender: allPaggPages[selectedCurrentPageUrl],
    isFirstPage,
    isLastPage,
  };
};

export default usePagination;
