import React, { PropsWithChildren } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ThemeContext from '../../context/theme-context';
import useDarkTheme from '../../hooks/use-dark-theme';

export default function ThemeProvider({ children }: PropsWithChildren) {
  const { providerValue } = useDarkTheme();

  return (
    <ThemeContext.Provider value={providerValue}>
      { children }
      <ToastContainer theme={providerValue.isDark} />
    </ThemeContext.Provider>
  );
}
