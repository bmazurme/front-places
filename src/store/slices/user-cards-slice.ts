/* eslint-disable no-undef */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { cardsApiEndpoints } from '../api/card-api/endpoints';
import { authApiEndpoints } from '../api/auth-api/endpoints';
import type { RootState } from '..';

export type UserCardsState = {
  data: Card[],
};

export const initialStateUserCards: UserCardsState = {
  data: [],
};

const slice = createSlice({
  name: 'ucards',
  initialState: initialStateUserCards,
  reducers: {
    setUserCards: (
      state,
      { payload: data }: PayloadAction<Card[]>,
    ) => ({ ...state, data }),
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        cardsApiEndpoints.endpoints.getCardsByUser.matchFulfilled,
        (state, action) => ({ ...state, data: action.payload }),
      )
      .addMatcher(
        authApiEndpoints.endpoints.signOut.matchFulfilled,
        () => initialStateUserCards,
      );
  },
});

export const { setUserCards } = slice.actions;
export default slice.reducer;
export const userCardsSelector = (state: RootState) => state.ucards.data;
