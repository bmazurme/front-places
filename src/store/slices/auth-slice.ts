import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { authApiEndpoints } from '../api/auth-api/endpoints';
import type { RootState } from '..';

export type AuthState = {
  accessToken: string | null;
  isAuthenticated: boolean;
  status: 'idle' | 'checking';
};

export const initialStateAuth: AuthState = {
  accessToken: null,
  isAuthenticated: false,
  status: 'checking',
};

const loggedOutState: AuthState = {
  accessToken: null,
  isAuthenticated: false,
  status: 'idle',
};

const slice = createSlice({
  name: 'auth',
  initialState: initialStateAuth,
  reducers: {
    setCredentials: (state, { payload }: PayloadAction<{ accessToken: string }>) => ({
      ...state,
      accessToken: payload.accessToken,
      isAuthenticated: true,
      status: 'idle',
    }),
    logout: () => loggedOutState,
    setChecking: (state) => ({ ...state, status: 'checking' }),
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApiEndpoints.endpoints.signOut.matchFulfilled,
        () => loggedOutState,
      );
  },
});

export const { setCredentials, logout, setChecking } = slice.actions;
export default slice.reducer;
export const authSelector = (state: RootState) => state.auth;
