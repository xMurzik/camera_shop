import { IItem } from '../types/items';

export function chunkArray(array: Array<number | IItem>, chunk: number) {
  const newArray = [];
  for (let i = 0; i < array.length; i += chunk) {
    newArray.push(array.slice(i, i + chunk));
  }
  return newArray;
}

export function checkUrlParams(value: string | null, maxPageCount: number) {
  if (!value || !Number(value)) {
    return true;
  }

  if (Number(value) > maxPageCount || Number(value) <= 0) {
    return true;
  }
}
