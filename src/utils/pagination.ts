import { IComment } from '../types/comments';
import { IItem } from '../types/items';

export function chunkArray(
  array: Array<number | IItem | IComment>,
  chunk: number
) {
  const newArray = [];
  for (let i = 0; i < array.length; i += chunk) {
    newArray.push(array.slice(i, i + chunk));
  }
  return newArray;
}

export function checkUrlParams(value: string | null, maxPageCount: number) {
  const numValue = Number(value);
  return Number.isNaN(numValue) || numValue > maxPageCount || numValue <= 0;
}
