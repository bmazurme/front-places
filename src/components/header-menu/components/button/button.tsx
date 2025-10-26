import React from 'react';
import classNames from 'classnames';
import { BiMenu, BiX } from '../../../../utils/icons/bi';

import style from './button.module.css';

export default function Button({ isOpen, handlerClick }
  : { isOpen: boolean; handlerClick: () => void; }) {
  return (
    <button
      type="button"
      onClick={handlerClick}
      aria-label="Switch menu"
      className={classNames(style.button, { [style.opened]: isOpen })}
    >
      {isOpen ? <BiX size={30} /> : <BiMenu size={30} />}
    </button>
  );
}
