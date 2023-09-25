import { createPromos } from '../../mocks/mock';
import { fetchPromos } from './async-promo';
import promoSlice from './promo-slice';

describe('promo slice', () => {
  const promos = createPromos();

  const state = { promos: [], isLoading: false, isError: false };

  it('fetchPromos.pending', () => {
    const expectedState = { promos: [], isLoading: true, isError: false };

    const result = promoSlice(state, fetchPromos.pending);
    expect(result).toEqual(expectedState);
  });

  it('fetchPromos.fulfilled', () => {
    const expectedState = { ...state, promos };

    const result = promoSlice(
      state,
      fetchPromos.fulfilled(promos, '', undefined)
    );
    expect(result).toEqual(expectedState);
  });

  it('fetchPromos.rejected', () => {
    const stateCopy = { promos, isLoading: true, isError: false };
    const expectedState = { promos: [], isLoading: false, isError: true };
    const result = promoSlice(stateCopy, fetchPromos.rejected);

    expect(result).toEqual(expectedState);
  });
});
