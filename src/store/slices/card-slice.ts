/* eslint-disable no-undef */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import type { RootState } from '..';

export type CardState = {
  data: Card | null,
};

export const initialStateCard: CardState = {
  data: null,
};

const slice = createSlice({
  name: 'card',
  initialState: initialStateCard,
  reducers: {
    setCard: (
      state,
      { payload: data }: PayloadAction<Card | null>,
    ) => ({ ...state, data }),
  },
});

export const { setCard } = slice.actions;
export default slice.reducer;
export const cardSelector = (state: RootState) => state.card.data;
