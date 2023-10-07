import {
  CameraCategory,
  FilterParam,
  LevelValue,
  Param,
  Sort,
  SortCount,
  TypeValue,
} from '../constants/sort-filters';
import { IItem } from '../types/items';

export const sortByParams = (items: Array<IItem>) => {
  const copyItems = [...items];

  const paramsFromUrl = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(paramsFromUrl.entries());

  if (!(Param.SortCountVal in params) && !(Param.SortType in params)) {
    return copyItems;
  }

  if (Param.SortCountVal in params && Param.SortType in params) {
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

  if (Param.SortType in params && !(Param.SortCountVal in params)) {
    switch (params.sortType) {
      case Sort.Popular: {
        return copyItems.sort((a, b) => b.rating - a.rating);
      }
      case Sort.Price: {
        return copyItems.sort((a, b) => b.price - a.price);
      }
    }
  }

  if (!(Param.SortType in params) && Param.SortCountVal in params) {
    switch (params.sortCount) {
      case SortCount.Up: {
        return copyItems.sort((a, b) => a.price - b.price);
      }
      case SortCount.Down: {
        return copyItems.sort((a, b) => b.price - a.price);
      }
    }
  }

  return copyItems;
};

export const filterByCategoryTypeLevel = (items: Array<IItem>) => {
  let copyItems = [...items];

  const paramsFromUrl = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(paramsFromUrl.entries());

  if (FilterParam.Category in params && params.category) {
    switch (params.category) {
      case CameraCategory.Photocamera: {
        copyItems = copyItems.filter(
          (el) => el.category === CameraCategory.Photocamera
        );
        break;
      }
      case CameraCategory.Videocamera: {
        copyItems = copyItems.filter(
          (el) => el.category === CameraCategory.Videocamera
        );
        break;
      }
    }
  }

  if (FilterParam.Type in params) {
    const types = JSON.parse(params.type) as Array<string>;

    if (types.length) {
      copyItems = copyItems.filter((el) => types.includes(el.type));
    }
  }

  if (FilterParam.Level in params) {
    const levels = JSON.parse(params.level) as Array<string>;
    if (levels.length) {
      copyItems = copyItems.filter((el) => levels.includes(el.level));
    }
  }

  return copyItems;
};

export const isCheckedTypeFilter = (value: TypeValue) => {
  const paramsFromUrl = new URLSearchParams(window.location.search);

  const params = paramsFromUrl.get(FilterParam.Type);

  if (params) {
    const parsedVal = JSON.parse(params) as Array<string>;
    if (!parsedVal.length) {
      return false;
    }
    if (parsedVal.length) {
      return parsedVal.includes(value);
    }
  }

  return false;
};

export const isCheckedLevelFilter = (value: LevelValue) => {
  const paramsFromUrl = new URLSearchParams(window.location.search);

  const params = paramsFromUrl.get(FilterParam.Level);

  if (params) {
    const parsedVal = JSON.parse(params) as Array<string>;
    if (!parsedVal.length) {
      return false;
    }
    if (parsedVal.length) {
      return parsedVal.includes(value);
    }
  }

  return false;
};

export const filterByPrice = (items: Array<IItem>) => {
  const paramsFromUrl = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(paramsFromUrl.entries());

  let copyItems = [...items];

  if (FilterParam.PriceMin in params && params.priceMin) {
    copyItems = copyItems.filter((el) => el.price >= Number(params.priceMin));
  }

  if (FilterParam.PriceMax in params && params.priceMax) {
    copyItems = copyItems.filter((el) => el.price <= Number(params.priceMax));
  }

  return copyItems;
};

export const filterAndSort = (items: Array<IItem>) => {
  const result = sortByParams(items);

  return filterByCategoryTypeLevel(result);
};

export const filterSortAll = (items: Array<IItem>) => {
  const result = filterByPrice(filterByCategoryTypeLevel(sortByParams(items)));

  return result;
};
