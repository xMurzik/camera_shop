import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { createPortal } from 'react-dom';
import ModalItem from '../../components/modal-item/modal-item';
import ModalSuccessBasket from '../../components/modal-success-basket/modal-success-basket';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { onClickOverlayOrExit } from '../../store/modal-slice/modal-slice';

const MainLayout: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const onClickEsc = (evt: KeyboardEvent) => {
      if (evt.code === 'Escape') {
        dispatch(onClickOverlayOrExit());
      }
    };
    document.addEventListener('keydown', onClickEsc);

    return () => {
      document.removeEventListener('keydown', onClickEsc);
    };
  }, [dispatch]);

  return (
    <div className="wrapper">
      <Header />
      <Outlet />
      <Footer />
      {createPortal(<ModalItem isDelete={false} />, document.body)}
      {createPortal(<ModalSuccessBasket />, document.body)}
    </div>
  );
};

export default MainLayout;
