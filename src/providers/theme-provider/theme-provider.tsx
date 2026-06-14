import React, { PropsWithChildren } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import useDarkTheme from '../../hooks/use-dark-theme';

export default function ThemeProvider({ children }: PropsWithChildren) {
  const { providerValue } = useDarkTheme();

  return (
    <>
      { children }
      <ToastContainer theme={providerValue.isDark} />
    </>
  );
}
