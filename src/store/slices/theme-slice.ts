import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '..';

export type ThemeState = {
  isDark: 'light' | 'dark',
};

export const initialStateTheme: ThemeState = {
  isDark: localStorage.getItem('ms-theme') === 'dark' ? 'dark' : 'light',
};

const slice = createSlice({
  name: 'theme',
  initialState: initialStateTheme,
  reducers: {
    toggleTheme: (state) => {
      const isDark = state.isDark === 'light' ? 'dark' : 'light';

      localStorage.setItem('ms-theme', isDark);

      return { ...state, isDark };
    },
  },
});

export const { toggleTheme } = slice.actions;
export default slice.reducer;
export const themeSelector = (state: RootState) => state.theme;
