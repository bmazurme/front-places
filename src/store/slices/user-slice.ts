/* eslint-disable no-undef */
import { createSlice } from '@reduxjs/toolkit';

import { usersApiEndpoints } from '../api/user-api/endpoints';
import { authApiEndpoints } from '../api/auth-api/endpoints';
import type { RootState } from '..';

export type InfoState = {
  data: User | null,
};

export const initialStateUser: InfoState = {
  data: null,
};

const slice = createSlice({
  name: 'user',
  initialState: initialStateUser,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        usersApiEndpoints.endpoints.getUserMe.matchFulfilled,
        (state, action) => ({ ...state, data: action.payload }),
      )
      .addMatcher(
        usersApiEndpoints.endpoints.updateUser.matchFulfilled,
        (state, action) => ({ ...state, data: action.payload }),
      )
      .addMatcher(
        usersApiEndpoints.endpoints.updateUserAvatar.matchFulfilled,
        (state, action) => ({ ...state, data: action.payload }),
      )
      .addMatcher(
        authApiEndpoints.endpoints.signOut.matchFulfilled,
        () => initialStateUser,
      );
  },
});

export default slice.reducer;
export const userSelector = (state: RootState) => state.user.data;
