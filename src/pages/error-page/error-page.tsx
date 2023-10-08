import React from 'react';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { fetchItems } from '../../store/items-slice/async-items';
import { useNavigate } from 'react-router-dom';
import { Path } from '../../constants/common';
import { toast } from 'react-toastify';
import s from './error-page.module.scss';

const ErrorPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onClickResetButton = () => {
    dispatch(fetchItems())
      .unwrap()
      .then(() => {
        navigate(Path.Catalog, { replace: true });
      })
      .catch(() => {
        toast.warn('Ошибка');
      });
  };

  return (
    <div className={s['container']}>
      <h1 className={s['title']}>Произошла ошибка</h1>
      <button onClick={onClickResetButton} className={s['button-reset']}>
        Попробовать снова
      </button>
    </div>
  );
};

export default ErrorPage;
