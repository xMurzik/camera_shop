import { datatype, date, name, lorem } from 'faker';
import { Action } from 'redux';
import { IPromo } from '../types/promo';
import { IItem, TAllower, TCategory, TLevel } from '../types/items';
import { IComment } from '../types/comments';
import { State } from '../store/store';

export const extractActionsTypes = (actions: Action<string>[]) =>
  actions.map(({ type }) => type);

export const createPromos = (length = 5): Array<IPromo> => {
  const res: Array<IPromo> = new Array(length).fill(null).map(() => ({
    id: datatype.number(100),
    name: name.firstName(),
    previewImg: name.firstName(),
    previewImg2x: name.firstName(),
    previewImgWebp: name.firstName(),
    previewImgWebp2x: name.firstName(),
  }));

  return res;
};

export const createItems = (length = 5): Array<IItem> => {
  const arrAlloweds = [
    'Коллекционная',
    'Моментальная',
    'Цифровая',
    'Плёночная',
  ];
  const categotys = ['Видеокамера', 'Фотоаппарат'];
  const levels = ['Нулевой', 'Любительский', 'Профессиональный'];

  const res: Array<IItem> = new Array(length).fill(null).map(() => ({
    id: datatype.number(100),
    name: name.firstName(),
    vendorCode: datatype.uuid(),
    type: arrAlloweds[
      Math.floor(Math.random() * arrAlloweds.length)
    ] as TAllower,
    category: categotys[
      Math.floor(Math.random() * categotys.length)
    ] as TCategory,
    description: datatype.uuid(),
    level: levels[Math.floor(Math.random() * levels.length)] as TLevel,
    price: datatype.number(100000),
    rating: datatype.number(100000),
    reviewCount: datatype.number(50),
    previewImg: name.firstName(),
    previewImg2x: name.firstName(),
    previewImgWebp: name.firstName(),
    previewImgWebp2x: name.firstName(),
  }));

  return res;
};

export const createComments = (length = 5): Array<IComment> => {
  const res: Array<IComment> = new Array(length).fill(null).map(() => ({
    id: datatype.uuid(),
    createAt: date.past().toISOString(),
    cameraId: datatype.number(100),
    userName: name.firstName(),
    advantage: lorem.paragraph(),
    disadvantage: lorem.paragraph(),
    review: lorem.paragraph(),
    rating: datatype.number({ min: 1, max: 5 }),
  }));

  return res;
};

export const createFakeStore = (): State => ({
  promo: {
    isError: false,
    isLoading: false,
    promos: createPromos(3),
  },
  items: {
    items: createItems(),
    filtredItems: createItems(),
    isLoading: false,
    isError: false,
  },
  item: {
    item: createItems()[0],
    similarItems: createItems(),
    comments: createComments(),
  },
  modal: {
    currentActiveCatalogItem: createItems()[0],
    currentActiveBasketItem: createItems()[0],
    isShowModalToBuy: false,
    isShowModalSuccesBasket: false,
  },
});
