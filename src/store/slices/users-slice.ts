/* eslint-disable no-undef */
import { createSlice } from '@reduxjs/toolkit';

import { usersApiEndpoints } from '../api/user-api/endpoints';
import type { RootState } from '..';

export type UsersState = {
  data: User[],
};

export const initialStateUsers: UsersState = {
  data: [],
};

const slice = createSlice({
  name: 'users',
  initialState: initialStateUsers,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        usersApiEndpoints.endpoints.getUsers.matchFulfilled,
        (state, action) => ({ ...state, data: action.payload }),
      )
      .addMatcher(
        usersApiEndpoints.endpoints.getUsers.matchRejected,
        (state, action) => {
          if (action.error.name !== 'ConditionError') {
            console.log('rejected', action);
          }
        },
      );
  },
});

export default slice.reducer;
export const usersSelector = (state: RootState) => state.users.data;
