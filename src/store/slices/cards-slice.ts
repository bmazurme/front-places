/* eslint-disable no-undef */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { cardsApiEndpoints } from '../api/card-api/endpoints';
import type { RootState } from '..';

export type CardsState = { data: Card[] };
export const initialStateCards: CardsState = { data: [] };

const slice = createSlice({
  name: 'cards',
  initialState: initialStateCards,
  reducers: {
    setCards: (
      state,
      { payload: data }: PayloadAction<Card[]>,
    ) => ({ ...state, data }),
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        cardsApiEndpoints.endpoints.getCardsByPage.matchFulfilled,
        (state, action) => ({ ...state, data: [...state.data, ...action.payload] }),
      )
      .addMatcher(
        cardsApiEndpoints.endpoints.getCardsByPage.matchRejected,
        (state, action) => {
          if (action.error.name !== 'ConditionError') {
            console.log('rejected', action);
          }
        },
      )
      .addMatcher(
        cardsApiEndpoints.endpoints.getCardsByUser.matchFulfilled,
        (state, action) => ({ ...state, data: [...state.data, ...action.payload] }),
      )
      .addMatcher(
        cardsApiEndpoints.endpoints.getCardsByUser.matchRejected,
        (state, action) => {
          if (action.error.name !== 'ConditionError') {
            console.log('rejected', action);
          }
        },
      )
      .addMatcher(
        cardsApiEndpoints.endpoints.getCardsByTag.matchFulfilled,
        (state, action) => ({ ...state, data: [...state.data, ...action.payload] }),
      )
      .addMatcher(
        cardsApiEndpoints.endpoints.getCardsByTag.matchRejected,
        (state, action) => {
          if (action.error.name !== 'ConditionError') {
            console.log('rejected', action);
          }
        },
      )
      .addMatcher(
        cardsApiEndpoints.endpoints.deleteCard.matchFulfilled,
        (state, action) => {
          console.log(action);
          return {
            ...state,
            data: state.data.filter((c) => c.id !== Number(action.payload.id)),
          };
        },
      )
      .addMatcher(
        cardsApiEndpoints.endpoints.deleteCard.matchRejected,
        (state, action) => {
          if (action.error.name !== 'ConditionError') {
            console.log('rejected', action);
          }
        },
      )
      .addMatcher(
        cardsApiEndpoints.endpoints.addCard.matchFulfilled,
        (state, action) => ({
          ...state,
          data: [action.payload, ...state.data],
        }),
      )
      .addMatcher(
        cardsApiEndpoints.endpoints.addCard.matchRejected,
        (state, action) => {
          if (action.error.name !== 'ConditionError') {
            console.log('rejected', action);
          }
        },
      )

      .addMatcher(
        cardsApiEndpoints.endpoints.changeLike.matchFulfilled,
        (state, action) => ({
          ...state,
          data: state.data.map((c) => (c.id === action.payload.id ? action.payload : c)),
        }),
      )
      .addMatcher(
        cardsApiEndpoints.endpoints.changeLike.matchRejected,
        (state, action) => {
          if (action.error.name !== 'ConditionError') {
            console.log('rejected', action);
          }
        },
      );
  },
});

export default slice.reducer;
export const { setCards } = slice.actions;
export const cardsSelector = (state: RootState) => state.cards.data;
