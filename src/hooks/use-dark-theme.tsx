import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from './index';
import { themeSelector, toggleTheme } from '../store';

export default function useDarkTheme() {
  const dispatch = useAppDispatch();
  const { isDark } = useAppSelector(themeSelector);

  useEffect(() => document.documentElement.setAttribute('ms-theme', isDark), [isDark]);

  return { providerValue: { isDark, toggleIsDark: () => dispatch(toggleTheme()) } };
}
