/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import { BiMoon, BiSun } from '../../utils/icons/bi';

import ThemeContext from '../../context/theme-context';

import style from './theme-button.module.css';

export default function ThemeButton() {
  const { isDark, toggleIsDark } = useContext(ThemeContext);

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
