import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { MIN_COUNT_VALUE_INPUT } from '../../constants/search-form';
import useKeyPress from '../../hooks/use-key-press';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux-hooks';
import { getAllItems } from '../../store/items-slice/items-selectors';
import classNames from 'classnames';
import { Path } from '../../constants/common';
import s from './search-form.module.scss';

const SearchForm: React.FC = () => {
  const navigate = useNavigate();
  const refUl = useKeyPress();
  const allItems = useAppSelector(getAllItems);
  const [inputValue, setInputValue] = useState('');

  const onChangeInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(evt.target.value);
  };

  const onResetInput = () => {
    setInputValue('');
  };

  const onClickSearchingItem = useCallback(
    (id: number) => () => {
      navigate(`${Path.Catalog + id.toString()}`);
      setInputValue('');
    },
    [navigate]
  );

  useEffect(() => {
    const onClickResetValueInput = (evt: MouseEvent) => {
      const { target } = evt;
      if (target instanceof HTMLElement) {
        if (
          target.className !==
          ('form-search__input' ||
            'form-search__select-list' ||
            'form-search__icon')
        ) {
          onResetInput();
        }
      }
    };

    document.addEventListener('click', onClickResetValueInput);

    return () => {
      document.removeEventListener('click', onClickResetValueInput);
    };
  }, []);

  const searchindItems = useMemo(() => {
    const result = allItems
      .filter((el) => el.name.toLowerCase().includes(inputValue.toLowerCase()))
      .map((searchindEl) => (
        <li
          data-id={searchindEl.id}
          key={searchindEl.id}
          className="form-search__select-item"
          tabIndex={0}
          onClick={onClickSearchingItem(searchindEl.id)}
        >
          {searchindEl.name}
        </li>
      ));

    if (!result.length && inputValue.length >= MIN_COUNT_VALUE_INPUT) {
      return <li className="form-search__select-item">No items</li>;
    }

    return result;
  }, [allItems, inputValue, onClickSearchingItem]);

  const onKeyDownUl = (evt: React.KeyboardEvent<HTMLUListElement>) => {
    if (evt.key === 'Enter') {
      const id = document.activeElement?.getAttribute('data-id');
      if (id) {
        navigate(`${Path.Catalog}${id}`);
        onResetInput();
      }
    }
  };

  return (
    <div
      className={classNames('form-search', {
        'list-opened': inputValue.length >= MIN_COUNT_VALUE_INPUT,
      })}
    >
      <form>
        <label>
          <svg
            className="form-search__icon"
            width={16}
            height={16}
            aria-hidden="true"
          >
            <use xlinkHref="#icon-lens" />
          </svg>
          <input
            className="form-search__input"
            type="text"
            autoComplete="off"
            placeholder="Поиск по сайту"
            value={inputValue}
            onChange={onChangeInput}
          />
        </label>
        <ul
          onKeyDown={onKeyDownUl}
          ref={refUl}
          className={`${s['ul-list']} form-search__select-list`}
        >
          {searchindItems}
        </ul>
      </form>
      <button
        onClick={onResetInput}
        className="form-search__reset"
        type="reset"
      >
        <svg width={10} height={10} aria-hidden="true">
          <use xlinkHref="#icon-close" />
        </svg>
        <span className="visually-hidden">Сбросить поиск</span>
      </button>
    </div>
  );
};

export default SearchForm;
