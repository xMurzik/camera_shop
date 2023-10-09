import React from 'react';
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

  const checkMinPrice = (value: string) => {
    if (!minValueInput.current || !maxValueInput.current) {
      return;
    }

    let newValue: string | undefined = value;

    if (!value || !Number(value)) {
      params.delete(FilterParam.PriceMin);
      minValueInput.current.value = '';
    } else {
      newValue = Math.max(minPrice, Number(value)).toString();

      if (
        maxValueInput.current.value &&
        Number(newValue) > Number(maxValueInput.current.value)
      ) {
        newValue = maxValueInput.current.value;
      } else if (Number(newValue) > maxPrice) {
        newValue = maxPrice.toString();
      }

      params.set(FilterParam.PriceMin, newValue);
    }

    setParams(params);
    minValueInput.current.value = newValue;
    minValueInput.current.blur();
  };

  const checkMaxPrice = (value: string) => {
    if (!minValueInput.current || !maxValueInput.current) {
      return;
    }

    let newValue: string | undefined = value;

    switch (true) {
      case !value || !Number(value):
        newValue = '';
        params.delete(FilterParam.PriceMax);
        break;

      case Number(value) >= maxPrice || Number(value) < 0:
        newValue = maxPrice.toString();
        params.set(FilterParam.PriceMax, newValue);
        break;

      case minValueInput.current.value &&
        Number(value) < Number(minValueInput.current.value):
        newValue = minValueInput.current.value;
        params.set(FilterParam.PriceMax, newValue);
        break;

      case Number(value) < minPrice:
        newValue = minPrice.toString();
        params.set(FilterParam.PriceMax, newValue);
        break;

      default:
        params.set(Param.Page, '1');
        params.set(FilterParam.PriceMax, value);
    }

    setParams(params);
    maxValueInput.current.value = newValue;
    maxValueInput.current.blur();
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
