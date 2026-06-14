/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { BiMoon, BiSun } from '../../utils/icons/bi';

import useDarkTheme from '../../hooks/use-dark-theme';

import style from './theme-button.module.css';

export default function ThemeButton() {
  const { providerValue: { isDark, toggleIsDark } } = useDarkTheme();

  return (
    <button
      className={style.button}
      type="button"
      aria-label="Switch theme"
      onClick={toggleIsDark}
    >
      {isDark === 'light' ? <BiMoon /> : <BiSun />}
    </button>
  );
}
