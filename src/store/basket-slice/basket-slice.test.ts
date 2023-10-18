import { createItems } from '../../mocks/mock';
import { datatype } from 'faker';
import { IItemCard } from '../../types/basket';
import basketSlice, {
  addItemsToBasket,
  decreaseCountItem,
  deleteAllItems,
  increaseCountItem,
  resetBasket,
  resetError,
  setCountItem,
} from './basket-slice';
import { fetchCoupon } from './async-basket';

describe('basket slice', () => {
  const basedItems = createItems();

  const cardItems: Array<IItemCard> = basedItems.map((el) => ({
    ...el,
    count: datatype.number(100),
  }));

  const state = {
    isError: true,
    items: [...cardItems],
    sale: { value: 15, name: 'camera-333' },
  };

  it('reset basket', () => {
    const expectedState = {
      isError: false,
      items: [],
      sale: null,
    };

    const result = basketSlice(state, resetBasket);

    expect(result).toEqual(expectedState);
  });

  it('add item to basket', () => {
    let copyCardItems = [...cardItems];

    copyCardItems = copyCardItems.map((el, id) => {
      if (id === 0) {
        return { ...el, count: el.count + 1 };
      }
      return el;
    });

    const copyStateEdited = {
      isError: false,
      items: [...cardItems],
      sale: null,
    };

    const expectedState = {
      isError: false,
      items: copyCardItems,
      sale: null,
    };

    const result = basketSlice(
      copyStateEdited,
      addItemsToBasket(basedItems[0])
    );

    expect(result).toEqual(expectedState);
  });

  it('delete all items', () => {
    const expectedITems = cardItems.filter((el) => el.id !== basedItems[0].id);

    const expectedState = {
      isError: true,
      items: expectedITems,
      sale: { value: 15, name: 'camera-333' },
    };

    const result = basketSlice(state, deleteAllItems(basedItems[0].id));

    expect(result).toEqual(expectedState);
  });

  it('increase count item', () => {
    let copyCardItems = [...cardItems];

    copyCardItems = copyCardItems.map((el, id) => {
      if (id === 0) {
        return { ...el, count: el.count + 1 };
      }
      return el;
    });

    const copyStateEdited = {
      isError: false,
      items: [...cardItems],
      sale: null,
    };

    const expectedState = {
      isError: false,
      items: copyCardItems,
      sale: null,
    };

    const result = basketSlice(
      copyStateEdited,
      increaseCountItem(basedItems[0].id)
    );

    expect(result).toEqual(expectedState);
  });

  it('decrease count item', () => {
    let copyCardItems = [...cardItems];

    copyCardItems = copyCardItems.map((el, id) => {
      if (id === 0) {
        return { ...el, count: el.count - 1 };
      }
      return el;
    });

    const copyStateEdited = {
      isError: false,
      items: [...cardItems],
      sale: null,
    };

    const expectedState = {
      isError: false,
      items: copyCardItems,
      sale: null,
    };

    const result = basketSlice(
      copyStateEdited,
      decreaseCountItem(basedItems[0].id)
    );

    expect(result).toEqual(expectedState);
  });

  it('set count item', () => {
    const arg = { count: 10, id: basedItems[0].id };

    let copyCardItems = [...cardItems];

    copyCardItems = copyCardItems.map((el, id) => {
      if (id === 0) {
        return { ...el, count: 10 };
      }
      return el;
    });

    const expectedState = {
      isError: true,
      items: copyCardItems,
      sale: { value: 15, name: 'camera-333' },
    };

    const result = basketSlice(state, setCountItem(arg));

    expect(result).toEqual(expectedState);
  });

  it('reset error', () => {
    const expectedState = {
      isError: false,
      items: [...cardItems],
      sale: { value: 15, name: 'camera-333' },
    };

    const result = basketSlice(state, resetError);

    expect(result).toEqual(expectedState);
  });

  it('fetch coupon pending', () => {
    const expectedState = { ...state, isError: false };

    const result = basketSlice(state, fetchCoupon.pending);

    expect(result).toEqual(expectedState);
  });

  it('fetch coupon fullfield', () => {
    const expectedState = {
      isError: true,
      items: [...cardItems],
      sale: {
        name: 'camera-444',
        value: 25,
      },
    };

    const result = basketSlice(state, fetchCoupon.fulfilled(25, '', ''));

    expect(result).toEqual(expectedState);
  });

  it('fetch coupon rejected', () => {
    const expectedState = {
      isError: true,
      items: [...cardItems],
      sale: null,
    };

    const result = basketSlice(state, fetchCoupon.rejected);

    expect(result).toEqual(expectedState);
  });
});
