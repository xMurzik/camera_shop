import { createItems } from '../../mocks/mock';
import modalSlice, {
  onClickBuy,
  onClickOverlayOrExit,
  onClickSuccessBuy,
  setCurrentActiveBasketItem,
  setCurrentActiveCatalogItem,
} from './modal-slice';

describe('modal slice', () => {
  const state = {
    currentActiveCatalogItem: null,
    currentActiveBasketItem: null,
    currentActiveDeleteItem: null,
    isShowModalToBuy: false,
    isShowModalSuccesBasket: false,
    isShowModalToDelete: false,
  };

  const activeItem = createItems()[0];
  const activeBasketItems = createItems()[0];

  it('setCurrentActiveCatalogItem', () => {
    const expectedState = {
      ...state,
      currentActiveCatalogItem: { ...activeItem },
    };

    const result = modalSlice(state, setCurrentActiveCatalogItem(activeItem));

    expect(result).toEqual(expectedState);
  });

  it('setCurrentActiveBasketItem', () => {
    const expectedState = {
      ...state,
      currentActiveBasketItem: { ...activeBasketItems },
    };

    const result = modalSlice(
      state,
      setCurrentActiveBasketItem(activeBasketItems)
    );

    expect(result).toEqual(expectedState);
  });

  it('onClickBuy', () => {
    const expectedState = {
      ...state,
      isShowModalToBuy: true,
      currentActiveCatalogItem: { ...activeItem },
    };

    const result = modalSlice(state, onClickBuy(activeItem));

    expect(result).toEqual(expectedState);
  });

  it('onClickOverlayOrExit', () => {
    const stateCopy = {
      currentActiveCatalogItem: null,
      currentActiveBasketItem: null,
      isShowModalToBuy: true,
      isShowModalSuccesBasket: true,
      currentActiveDeleteItem: null,
      isShowModalToDelete: false,
    };

    const result = modalSlice(stateCopy, onClickOverlayOrExit);

    expect(result).toEqual(state);
  });

  it('onClickSuccessBuy', () => {
    const stateCopy = {
      currentActiveCatalogItem: null,
      currentActiveBasketItem: null,
      isShowModalToBuy: true,
      isShowModalSuccesBasket: false,
      currentActiveDeleteItem: null,
      isShowModalToDelete: false,
    };

    const expectedState = {
      ...stateCopy,
      isShowModalToBuy: false,
      isShowModalSuccesBasket: true,
    };

    const result = modalSlice(stateCopy, onClickSuccessBuy);

    expect(result).toEqual(expectedState);
  });
});
