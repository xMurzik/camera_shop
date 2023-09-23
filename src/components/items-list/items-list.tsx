import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { getFiltredItems } from '../../store/items-slice/items-selectors';
import ItemCard from '../item-card/item-card';
import ModalItem from '../modal-item/modal-item';
import { setCurrentActiveCatalogItem } from '../../store/catalog-modal-slice/catalog-modal-slice';
import { IItem } from '../../types/items';

const ItemsList: React.FC = () => {
  const items = useAppSelector(getFiltredItems);
  const dispatch = useAppDispatch();

  const [isShowModalToBuy, setIsShowModalToBuy] = useState(false);

  const onClickBuy = (item: IItem) => {
    setIsShowModalToBuy(true);
    dispatch(setCurrentActiveCatalogItem(item));
    document.body.style.overflow = 'hidden';
  };

  const onClickOverlayOrExit = () => {
    setIsShowModalToBuy(false);
    document.body.style.overflow = 'unset';
  };

  useEffect(() => {
    const onClickEsc = (evt: KeyboardEvent) => {
      if (evt.code === 'Escape') {
        onClickOverlayOrExit();
      }
    };

    document.addEventListener('keydown', onClickEsc);

    return () => {
      document.removeEventListener('keydown', onClickEsc);
    };
  }, []);

  return (
    <div className="cards catalog__cards">
      {items.map((el) => (
        <ItemCard key={el.id} {...el} onClickBuy={onClickBuy} />
      ))}
      {createPortal(
        <ModalItem
          onClickOverlay={onClickOverlayOrExit}
          isActive={isShowModalToBuy}
          isDelete={false}
        />,
        document.body
      )}
    </div>
  );
};

export default ItemsList;
