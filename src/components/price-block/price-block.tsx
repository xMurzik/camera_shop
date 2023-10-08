import React, { useLayoutEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux-hooks';
import { getAllItems } from '../../store/items-slice/items-selectors';
import { filterAndSort } from '../../utils/params';
import { FilterParam, Param } from '../../constants/sort-filters';

interface IPriceBlockProps {
  maxValueInput: React.MutableRefObject<HTMLInputElement | null>;
  minValueInput: React.MutableRefObject<HTMLInputElement | null>;
}

const PriceBlock: React.FC<IPriceBlockProps> = ({
  maxValueInput,
  minValueInput,
}) => {
  const items = useAppSelector(getAllItems);
  const [params, setParams] = useSearchParams();

  const filteredItems = filterAndSort(items);

  let minPrice: number;
  let maxPrice: number;

  if (filteredItems.length) {
    minPrice = filteredItems.reduce((acc, el) => {
      if (acc.price < el.price) {
        return acc;
      }
      return el;
    }).price;

    maxPrice = filteredItems.reduce((acc, el) => {
      if (acc.price > el.price) {
        return acc;
      }
      return el;
    }).price;
  } else {
    minPrice = 0;
    maxPrice = 0;
  }

  useLayoutEffect(() => {
    if (minValueInput.current && maxValueInput.current) {
      if (minValueInput.current.value) {
        if (
          Number(minValueInput.current.value) < minPrice ||
          Number(minValueInput.current.value) > maxPrice
        ) {
          minValueInput.current.value = minPrice.toString();
          params.set(FilterParam.PriceMin, minPrice.toString());
          setParams(params);
        }
      }

      if (maxValueInput.current.value) {
        if (
          Number(maxValueInput.current.value) > maxPrice ||
          Number(maxValueInput.current.value) < minPrice
        ) {
          maxValueInput.current.value = maxPrice.toString();
          params.set(FilterParam.PriceMax, maxPrice.toString());
          setParams(params);
        }
      }
    }
  }, [maxPrice, maxValueInput, minPrice, minValueInput, params, setParams]);

  const checkMinPrice = (value: string) => {
    if (minValueInput.current) {
      if (maxValueInput.current) {
        if (!value || !Number(value)) {
          params.delete(FilterParam.PriceMin);
          setParams(params);
          minValueInput.current.value = '';
          minValueInput.current.blur();
          return;
        }

        if (Number(value) <= minPrice) {
          minValueInput.current.value = minPrice.toString();
          params.set(FilterParam.PriceMin, minPrice.toString());
          setParams(params);
          minValueInput.current.blur();
          return;
        }

        if (
          maxValueInput.current.value &&
          Number(value) > Number(maxValueInput.current.value)
        ) {
          minValueInput.current.value = maxValueInput.current.value;
          params.set(FilterParam.PriceMin, maxValueInput.current.value);
          setParams(params);
          minValueInput.current.blur();
          return;
        }

        if (Number(value) > maxPrice) {
          minValueInput.current.value = maxPrice.toString();
          params.set(FilterParam.PriceMin, maxPrice.toString());
          setParams(params);
          minValueInput.current.blur();
          return;
        }

        params.set(FilterParam.PriceMin, value);
        setParams(params);
        minValueInput.current.blur();
      }
    }
  };

  const checkMaxPrice = (value: string) => {
    if (minValueInput.current) {
      if (maxValueInput.current) {
        if (!value || !Number(value)) {
          maxValueInput.current.value = '';
          params.delete(FilterParam.PriceMax);
          setParams(params);
          maxValueInput.current.blur();
          return;
        }

        if (Number(value) >= maxPrice || Number(value) < 0) {
          maxValueInput.current.value = maxPrice.toString();
          params.set(FilterParam.PriceMax, maxPrice.toString());
          setParams(params);
          maxValueInput.current.blur();
          return;
        }

        if (
          minValueInput.current.value &&
          Number(value) < Number(minValueInput.current.value)
        ) {
          maxValueInput.current.value = minValueInput.current.value;
          params.set(FilterParam.PriceMax, minValueInput.current.value);
          setParams(params);
          maxValueInput.current.blur();
          return;
        }

        if (Number(value) < minPrice) {
          maxValueInput.current.value = minPrice.toString();
          params.set(FilterParam.PriceMax, minPrice.toString());
          setParams(params);
          maxValueInput.current.blur();
          return;
        }
        params.set(Param.Page, '1');
        params.set(FilterParam.PriceMax, value);
        setParams(params);
        maxValueInput.current.blur();
      }
    }
  };

  const onBlurMinPrice = (evt: React.FocusEvent<HTMLInputElement, Element>) => {
    checkMinPrice(evt.target.value);
    params.set(Param.Page, '1');
    setParams(params);
  };

  const onBlurMaxPrice = (evt: React.FocusEvent<HTMLInputElement, Element>) => {
    checkMaxPrice(evt.target.value);
    params.set(Param.Page, '1');
    setParams(params);
  };

  const onKeyDownMinPrice = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter') {
      const target = evt.target as HTMLInputElement;
      checkMinPrice(target.value);
      params.set(Param.Page, '1');
      setParams(params);
    }
  };

  const onKeyDownMaxPrice = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter') {
      const target = evt.target as HTMLInputElement;
      checkMaxPrice(target.value);
      params.set(Param.Page, '1');
      setParams(params);
    }
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="custom-input">
          <label>
            <input
              onKeyDown={onKeyDownMinPrice}
              ref={minValueInput}
              onBlur={onBlurMinPrice}
              type="number"
              name="price"
              placeholder={minPrice.toString()}
            />
          </label>
        </div>
        <div className="custom-input">
          <label>
            <input
              ref={maxValueInput}
              onBlur={onBlurMaxPrice}
              onKeyDown={onKeyDownMaxPrice}
              type="number"
              name="priceUp"
              placeholder={maxPrice.toString()}
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
};

export default PriceBlock;
