import { Param, Sort, SortCount } from '../constants/sort-filters';
import { IItem } from '../types/items';

export const filterByParams = (
  items: Array<IItem>,
  params: {
    [k: string]: string;
  }
) => {
  const copyItems = [...items];

  if (!(Param.sortCount in params) && !(Param.sortType in params)) {
    return copyItems;
  }

  if (Param.sortCount in params && Param.sortType in params) {
    if (params.sortType === Sort.Price) {
      switch (params.sortCount) {
        case SortCount.Up: {
          return copyItems.sort((a, b) => a.price - b.price);
        }
        case SortCount.Down: {
          return copyItems.sort((a, b) => b.price - a.price);
        }
      }
    }

    if (params.sortType === Sort.Popular) {
      switch (params.sortCount) {
        case SortCount.Up: {
          return copyItems.sort((a, b) => a.rating - b.rating);
        }
        case SortCount.Down: {
          return copyItems.sort((a, b) => b.rating - a.rating);
        }
      }
    }
  }

  if (Param.sortType in params && !(Param.sortCount in params)) {
    switch (params.sortType) {
      case Sort.Popular: {
        return copyItems.sort((a, b) => a.rating - b.rating);
      }
      case Sort.Price: {
        return copyItems.sort((a, b) => a.price - b.price);
      }
    }
  }

  if (!(Param.sortType in params) && Param.sortCount in params) {
    switch (params.sortCount) {
      case SortCount.Up: {
        return copyItems.sort((a, b) => a.price - b.price);
      }
      case SortCount.Down: {
        return copyItems.sort((a, b) => b.price - a.price);
      }
    }
  }
};
